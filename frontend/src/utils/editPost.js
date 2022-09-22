import { v4 } from "uuid";
import { domain } from "./domain";

async function editPost(title, postID,category, data, thumbnailUrl, accessToken, errors, setErrors) {
    let postData = {
        title: title,
        category: category,
        data: data,
        thumbnail: thumbnailUrl,
        post_id: postID
    }

    let apiUrl = domain+'/api/post/edit_post';

    let res = await fetch(apiUrl, {
        method: "POST",
        
        headers: {
            'Content-Type': 'application/json',
            'authorization': accessToken
        },
        body: JSON.stringify(postData)
    });

    if(res.status === 403) {
        let Error = {
            msg: "Access denied! You don't have permission to edit this post!",
            key: v4()
        }
        setErrors([...errors, Error]);
    }
    else if(!res.ok) {
        let ErrorBody = await res.json();
        let Errors = ErrorBody.errors.map((val) => {
            return {
                msg: val.msg,
                key: v4()
            }
        });
        setErrors(Errors);
    } else {
        window.location.href = `/article?id=${postID}`;
    }
}

export default editPost;