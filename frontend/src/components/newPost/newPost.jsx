import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../contexts/userContext';
import uploadPost from '../../utils/uploadPost';
import EditorJs from 'react-editor-js';
import Embed from '@editorjs/embed';
import Paragraph from '@editorjs/paragraph';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import List from '@editorjs/list';
import strings from "../../strings";
import { v4 } from "uuid";
import Cropper from 'react-easy-crop';
import uploadImage from "../../utils/uploadImage";
import { domain } from "../../utils/domain";

function NewPost() {
    let [user, setUser] = useContext(UserContext);
    let [editor, setEditor] = useState(Object);
    let [errors, setErrors] = useState([]);
    let [previewImage, setPreviewImage] = useState("");
    let [startCropImage, setStartCropImage] = useState(false);
    let [cropImage, setCropImage] = useState("");
    let [crop, setCrop] = useState({ x: 0, y: 0 });
    let [zoom, setZoom] = useState(1);
    let [thumbnailUploading, setThumbnailUploading] = useState(false);
    let [croppedArea, setCroppedArea] = useState({});
    let [thumbnailUrl, setThumbnailUrl] = useState("");
    let [editorOptions, setEditorOptions] = useState({
        embed: {
            class: Embed,
            inlineToolbar: true
        },
        paragraph: {
            class: Paragraph,
            inlineToolbar: true
        },
        image: {
            class: Image,
            inlineToolbar: true,
            config: {
                endpoints: {
                    byFile: domain+'/api/post/upload/image'
                },
                additionalRequestHeaders: {
                    authorization: user.accessToken
                }
            }
        },
        linkTool: {
            class: LinkTool,
            config: {
                endpoint: domain+"/api/utils/fetchUrl"
            },
            inlineToolbar: true
        },
        list: {
            class: List,
            inlineToolbar: true
        },
        quote: {
            class: Quote,
            inlineToolbar: true
        },
        header: {
            class: Header,
            inlineToolbar: true
        }
    })

    useEffect(() => {
        document.getElementsByTagName("body")[0].style.overflow = startCropImage ? "hidden" : "auto";
    }, [startCropImage])

    function closeError(key) {
        let currenterror = document.getElementById(key);
        console.log(key);
        currenterror.classList.toggle('error-closed');
        setTimeout(() => {
            setErrors(errors.filter((err) => {
                return err.key !== key
            }));
        }, 500);
    }

    function handleImageUploadWithPreview(e) {
        let input = e.target;
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                setStartCropImage(true);
                setCropImage(e.target.result);
                console.log(e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function saveAndUploadImage() {
        let image = document.createElement("img");
        image.src = cropImage;
        setStartCropImage(false);
        cropAndPreview(image);
    }

    function cropAndPreview(image) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxSize = Math.max(image.width, image.height)
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

        // set each dimensions to double largest dimension to allow for a safe area for the
        // image to rotate in without being clipped by canvas context
        canvas.width = safeArea
        canvas.height = safeArea

        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        )
        const data = ctx.getImageData(0, 0, safeArea, safeArea)

        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = croppedArea.width
        canvas.height = croppedArea.height

        // paste generated rotate image with correct offsets for x,y crop values.
        ctx.putImageData(
            data,
            Math.round(0 - safeArea / 2 + image.width * 0.5 - croppedArea.x),
            Math.round(0 - safeArea / 2 + image.height * 0.5 - croppedArea.y)
        )

        let imageData = canvas.toDataURL();
        setPreviewImage(imageData);

        canvas.toBlob((img) => {
            setThumbnailUploading(true);
            uploadImage(img, user.accessToken, setErrors, setThumbnailUploading, setThumbnailUrl, errors);
        })
    }

    async function createPost() {
        let title = document.getElementById("post-title").value;
        let category = document.getElementById("post-category").value;
        let accessToken = user.accessToken;
        let data = await editor.save();
        if (!title) {
            setErrors([...errors, {
                msg: "No title provided!",
                key: v4()
            }]);
        }
        else if (title.length < 10 || title.length > 100) {
            setErrors([...errors, {
                msg: "Title must be at least 10 charecters and 100 charecters long",
                key: v4()
            }]);
        }
        else if(thumbnailUrl === ""){
            setErrors([...errors, {
                msg: "Thumbnail image is required!",
                key: v4()
            }]);
        }
        else {
            await uploadPost(title, category, data, thumbnailUrl, accessToken, errors, setErrors);
        }
    }
    return (
        <div className="new-post">
            <div className="errors">
                {
                    errors.map(val => (
                        <div className="error" id={val.key} key={val.key}>
                            <span className="error-text">{val.msg}</span>
                            <button className="close-error" onClick={() => closeError(val.key)}>&times;</button>
                        </div>
                    ))
                }
            </div>
            {
                user.accessToken ? ( user.user.userType === "admin" || user.user.userType === "moderator") &&
                <div className="post-creator">
                    <h1>Create new post</h1>
                    <div className="input-container">
                        <label id="post-title-label">Post title</label>
                        <input type="text" id="post-title"></input>
                    </div>
                    <div className="input-container">
                        <label id="post-title-label">Post thumbnail</label>
                        {
                            previewImage !== ""
                            &&
                            <div className="thumbnail-preview">
                                {
                                    thumbnailUploading &&
                                    <div className="thumbnailpreview-loading">
                                        <div className="thumbnailpreview-loader"></div>
                                    </div>
                                }
                                <img src={previewImage} alt="thumbnail-image" id="thumbnail-preview" />
                                <span>{thumbnailUploading}</span>
                            </div>
                        }
                        {
                            startCropImage
                            &&
                            <div className="thumbnail-cropper-container">
                                <div className="thumbnail-cropper">
                                    <Cropper
                                        image={cropImage}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={2 / 1}
                                        onCropChange={(crop) => setCrop(crop)}
                                        onCropComplete={(croppedArea, croppedAreaPixels) => {
                                            setCroppedArea(croppedAreaPixels);
                                        }}
                                        onZoomChange={(zoom) => setZoom(zoom)}
                                    />
                                    <button className="save-cropped" onClick={saveAndUploadImage}>Done</button>
                                </div>
                            </div>
                        }
                        <input type="file" accept="image/*" onChange={handleImageUploadWithPreview} id="post-thumbnail"></input>
                        <p>Make sure the image has an aspect ratio of 2:1</p>
                    </div>
                    <div className="input-container">
                        <label>Post category</label>
                        <select id="post-category">
                            <option value="1">{strings.islam}</option>
                            <option value="2">{strings.islam_and_life}</option>
                            <option value="3">{strings.quran_and_hadith}</option>
                            <option value="4">{strings.atheist}</option>
                            <option value="5">{strings.dharma_beboshayee}</option>
                            <option value="6">{strings.sayeedul_aiyad_sharif}</option>
                        </select>
                    </div>
                    <div className="input-container" style={{ alignItems: "center" }}>
                        <h1>Post body</h1>
                        <div id="editorjs-container"></div>
                        <EditorJs
                            instanceRef={e => setEditor(e)}
                            tools={editorOptions}
                            holder="editorjs-container"
                            inlineToolbar={true}
                        >
                        </EditorJs>
                    </div>
                    <div className="input-container">
                        <button className="save" onClick={createPost}>Create Post</button>
                    </div>
                </div>
                :
                <h1>Only admin and moderators have access to this page</h1>
            }
        </div>
    )
}

export default NewPost;