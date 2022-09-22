import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import loadAndParsePost from '../../utils/loadAndParsePost';
import ImageViewerModal from '../imageViewerModal/ImageViewerModal';
import sanitizeHtml from 'sanitize-html-react';

function Article() {
    let [imageUrl, setImageUrl] = useState("");
    let [postJson, setPostJson] = useState("");
    let [postTitle, setPostTitle] = useState("");
    let [postThumbnail, setPostThumbnail] = useState("");
    let [errors, setErrors] = useState([]);
    let [postAuthor, setPostAuthor] = useState("");
    let [postCreationDate, setPostCreationDate] = useState(String);
    let [isPostLoading, setIsPostLoading] = useState(true);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        let post_id = query.get("id");
        loadAndParsePost(post_id, setPostJson, postJson, errors, setErrors, setPostTitle, setPostThumbnail, setPostAuthor, setPostCreationDate, setIsPostLoading);
    }, []);

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

    function extractHostname(url) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];

        return hostname;
    }

    return (
        <div>
            {
                postJson ?
                <div className="article">
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
                    <div className="articleViewer">
                        {
                            imageUrl && <ImageViewerModal src={imageUrl} setImageUrl={setImageUrl}></ImageViewerModal>
                        }
                        <h1 className="post-title">{postTitle}</h1>
                        <div className="post-header">
                            <span>By {postAuthor} at {postCreationDate}</span>
                        </div>
                        <div className="post-thumbnail">
                            <img src={postThumbnail} alt="post_thumbnail" onClick={() => setImageUrl(postThumbnail)} />
                        </div>
                        <div className="post">
                            {
                                postJson !== ""
                                &&
                                postJson.blocks.map(block => {
                                    const type = block.type;
                                    if (type === "header") {
                                        let text = block.data.text;
                                        let level = block.data.level;
                                        return (
                                            <div className="article-section">
                                                {
                                                    level === 1 &&
                                                    <h1 className="article-header" dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}></h1>
                                                }
                                                {
                                                    level === 2 &&
                                                    <h2 className="article-header" dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}></h2>
                                                }
                                                {
                                                    level === 3 &&
                                                    <h3 className="article-header" dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}></h3>
                                                }
                                                {
                                                    level === 4 &&
                                                    <h4 className="article-header" dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}></h4>
                                                }
                                                {
                                                    level === 5 &&
                                                    <h5 className="article-header" dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}></h5>
                                                }
                                                {
                                                    level === 6 &&
                                                    <h6 className="article-header" dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}></h6>
                                                }
                                            </div>
                                        )
                                    }
                                    else if (type === "paragraph") {
                                        let text = block.data.text;
                                        return (
                                            <div className="article-section">
                                                <p className="article-paragraph" dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}></p>
                                            </div>
                                        )
                                    }
                                    else if (type === "image") {
                                        let imgSrc = block.data.file.url;
                                        let stretched = block.data.stretched ? "article-image-stretched" : '';
                                        let withBorder = block.data.withBorder ? "article-image-withborder" : '';
                                        let withBackground = block.data.withBackground ? "article-image-withbackground" : '';
                                        let caption = block.data.caption;
                                        return (
                                            <div className="article-section">
                                                <img src={imgSrc} alt={"Image at " + imgSrc} className="article-image" onClick={() => setImageUrl(imgSrc)} />
                                                <span className="article-image-caption" dangerouslySetInnerHTML={{ __html: sanitizeHtml(caption) }}></span>
                                            </div>
                                        )
                                    }
                                    else if (type === "list") {
                                        let style = block.data.style === "unordered" ? 'ul' : 'ol';
                                        let items = block.data.items;
                                        return (
                                            <div className="article-section">
                                                {
                                                    style === "ul"
                                                        ?
                                                        <ul>
                                                            {items.map(item => (
                                                                <li dangerouslySetInnerHTML={{ __html: sanitizeHtml(item) }}></li>
                                                            ))}
                                                        </ul>
                                                        :
                                                        <ol>
                                                            {items.map(item => (
                                                                <li dangerouslySetInnerHTML={{ __html: sanitizeHtml(item) }}></li>
                                                            ))}
                                                        </ol>
                                                }
                                            </div>
                                        )
                                    }
                                    else if (type === "quote") {
                                        let quote = block.data.text;
                                        let caption = block.data.caption;
                                        let align = block.data.alignment;
                                        return (
                                            <div className="article-section">
                                                <div className="article-quote">
                                                    <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(quote) }}></p>
                                                    <span className="author" dangerouslySetInnerHTML={{ __html: "~" + sanitizeHtml(caption) }}></span>
                                                </div>
                                            </div>
                                        )

                                    }
                                    else if (type === "linkTool") {
                                        let link = block.data.link;
                                        let title = block.data.meta.title;
                                        let description = block.data.meta.description;
                                        let image = block.data.meta.image ? block.data.meta.image.url : '';
                                        return (
                                            <div className="article-section">
                                                <a href={link} className="linkTool" target="_blank">
                                                    <div className="linkTool-meta">
                                                        <div className="linkTool-description">
                                                            <h3 className="title">{title}</h3>
                                                            <p className="description">{description}</p>
                                                        </div>
                                                        <div className="linkTool-image">
                                                            {
                                                                image &&
                                                                <img src={image} alt={title} />
                                                            }
                                                        </div>
                                                    </div>
                                                    <p className="linkTool-domain">{extractHostname(link)}</p>
                                                </a>
                                            </div>
                                        )
                                    }
                                    else if (type === "embed") {
                                        let embedLink = block.data.embed;
                                        let caption = block.data.caption;
                                        return (
                                            <div className="article-embed">
                                                <iframe src={embedLink} frameBorder="0" height="350px"></iframe>
                                                <p className="article-embed-caption" dangerouslySetInnerHTML={{ __html: sanitizeHtml(caption) }}></p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div class="powr-comments" id="178358d7_1605547296"></div><script src="https://www.powr.io/powr.js?platform=react"></script>
                </div>
                :
                !isPostLoading && <h1 style={{textAlign:"center"}}>Post doesn't exists or maybe deleted by admin or moderator</h1>
            }
        </div>
    );
}

export default Article;