import { v4 } from "uuid";
import { domain } from "./domain";
import getUserById from "./getUserById";

async function loadAndParsePost(post_id, setPostJson, postJson, errors, setErrors, setPostTitle, setPostThumbnail, setPostAuthor, setPostCreationDate, setIsPostLoading) {
    let reqData = {
        post_id: post_id
    }

    if(!post_id || post_id === '') {
        setErrors([...errors, {
            msg: "Failed to load post! No post id given!",
            key: v4()
        }]);
        return;
    }

    let apiUrl = domain+'/api/post/get/id';
    let res = await fetch(apiUrl, {
        method: "POST",
        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
    });

    if(!res.ok) {
        setErrors([...errors, {
            msg: "Failed to find post! Maybe it's deleted",
            key: v4()
        }]);
    } else {
        let post = await res.json();
        if(!post) {
            return null;
        }
        setPostJson(post.data);
        setPostTitle(post.title);
        setPostThumbnail(post.thumbnail);
        let postCreated = new Date(post.date_posted);
        setPostCreationDate(postCreated.toString());
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        let clean = [];
        posts.forEach(p => {
            if(JSON.stringify(p) !== JSON.stringify(post)) {
                clean.push(p);
            }
        });
        clean.push(post);
        localStorage.setItem("posts", JSON.stringify(clean.reverse()));
        let user = await getUserById(post.author);
        if(user) {
            setPostAuthor(user.name);
        } else {
            setErrors([...errors, {
                msg: "Failed to get author info!",
                key: v4()
            }]);
        }
        setIsPostLoading(false);
    }
}

export default loadAndParsePost;