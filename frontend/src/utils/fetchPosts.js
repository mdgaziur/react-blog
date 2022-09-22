import {domain} from './domain';

async function fetchPosts(posts, setPosts, Indice, setIndice, setIsPostsLoading, setMorePostsAvailable) {
    setIsPostsLoading(true);
    let res = await fetch(domain+'/api/post/load', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            indice: Indice
        })
    });
    if(res.ok) {
        let newPosts = await res.json();
        if(newPosts.length === 0) {
            setMorePostsAvailable(false);
        }
        setPosts(posts.concat(newPosts));
        setIndice(Indice + 1);
    }
    setIsPostsLoading(false);
}

export default fetchPosts;