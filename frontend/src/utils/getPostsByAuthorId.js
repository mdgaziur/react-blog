import { domain } from "./domain";

async function getPostsByAuthorId(id) {
    let postData = {
        author_id: id
    };
    let res = await fetch(domain+'/api/post/get/author_id', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });
    if(!res.ok) {
        alert("Failed to get posts!");
    }
    else {
        let posts = await res.json();
        return posts;
    }
}

export default getPostsByAuthorId;