import { v4 } from "uuid";
import { domain } from './domain';

async function uploadPost(title, category, data, thumbnailUrl, accessToken, errors, setErrors) {
    let postData = {
        title: title,
        category: category,
        data: data,
        thumbnail: thumbnailUrl
    }

    let apiUrl = domain + '/api/post/create_post';

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
            msg: "Access denied! There is a chance that you're not an admin or moderator and trying to create post",
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
        let post = await res.json();
        window.location.href = `/article?id=${post._id}`;
    }
}

export default uploadPost;