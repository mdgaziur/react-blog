import { domain } from "./domain";

async function paginatePosts(posts, setPosts, Indice, setIndice, setIsPostsLoading, setMaxIndice) {
    setIsPostsLoading(true);
    let res = await fetch(domain+'/api/post/paginate', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            indice: Indice
        })
    });
    if(res.ok) {
        let response_data = await res.json();
        setPosts(response_data.posts);
        setMaxIndice(response_data.max);
        setIndice(Indice);
    }
    setIsPostsLoading(false);
}

export default paginatePosts;