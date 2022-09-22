import { domain } from "./domain";

async function getPostJson(post_id, setPostJson, setPostTitle, setPostThumbnail, setPreviewImage) {
    let reqData = {
        post_id: post_id
    }

    let apiUrl = domain+'/api/post/get/id';
    let res = await fetch(apiUrl, {
        method: "POST",

        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
    });

    if (!res.ok) {
        alert("Failed to find post! Maybe it's deleted.");
    } else {
        let post = await res.json();
        setPostJson(post.data);
        setPostTitle(post.title);
        setPostThumbnail(post.thumbnail);
        setPreviewImage(post.thumbnail);
    }
}

export default getPostJson;