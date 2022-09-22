import { v4 } from "uuid";
import { domain } from "./domain";

async function uploadImage(img, accessToken, setErrors, setThumbnailUploading, setThumbnailUrl, errors) {
    let apiUrl = domain+'/api/post/upload/image';

    let fd = new FormData();
    fd.append('image', img);

    let res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            'authorization': accessToken
        },
        body: fd
    });

    if(!res.ok) {
        let errorBody = await res.json();
        errorBody.map(error => {
            setErrors([...errors, {
                msg: error.msg,
                key: v4()
            }]);
        });
    } else {
        let jsonData = await res.json();

        if(jsonData.success === 0) {
            setErrors([...errors, {
                msg: "Failed to upload! Unknown error",
                key: v4()
            }]);
        }
        else {
            setThumbnailUrl(jsonData.file.url);
        }
    }
    setThumbnailUploading(false);
}

export default uploadImage;