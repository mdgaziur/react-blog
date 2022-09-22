import { domain } from "./domain";

async function fetchPostsByCategory(posts, setPosts, Indice, setIndice, setIsPostsLoading, setMaxIndice, category) {
    setIsPostsLoading(true);
    let res = await fetch(domain+'/api/post/get/category', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            indice: Indice,
            category: category
        })
    });
    if(res.ok) {
        let response_data = await res.json();
        setPosts(response_data.posts.length > 0 ? response_data.posts : []);
        setMaxIndice(response_data.max);
        setIndice(Indice);
    }
    setIsPostsLoading(false);
}

export default fetchPostsByCategory;