import { domain } from "./domain";

async function deletePost(post_id, accessToken, cb, params) {
    let apiUrl = '/api/post/delete';
    let postBody = {
        post_id: post_id
    };
    let r = confirm("Are you sure want to delete this post?\nThis cannot be undone!");
    if (r) {
        let res = await fetch(domain+'/api/post/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": accessToken
            },
            body: JSON.stringify(postBody)
        });
        if(res.ok) {
            alert("Successfully deleted the post.");
            cb(...params);
        } else {
            let resData = await res.json();
            alert(`Failed to delete the post!\nReasons:\n${JSON.stringify(resData)}`);
        }
    }

}

export default deletePost;