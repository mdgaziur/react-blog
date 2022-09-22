import React, { useContext, useEffect, useState } from 'react';
import strings, { categories } from '../../strings';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUser, faEdit, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons';
import fetchPosts from '../../utils/fetchPosts';
import { UserContext } from '../../contexts/userContext';
import getUserById from '../../utils/getUserById';
import deletePost from '../../utils/deletePost';
import { v4 } from 'uuid';

function Home() {
    let [posts, setPosts] = useState([]);
    let [postAuthor, setPostAuthor] = useState("");
    let [Indice, setIndice] = useState(1);
    let [isPostLoading, setIsPostLoading] = useState(false);
    let [morePostsAvailable, setMorePostsAvailable] = useState(true);
    useEffect(() => {
        fetchPosts(posts, setPosts, Indice, setIndice, setIsPostLoading, setMorePostsAvailable);
    }, []);
    async function getPostAuthor(userID) {
        let author = await getUserById(userID);
        setPostAuthor(author.name);
    }
    let [user] = useContext(UserContext);
    return (
        <div className="home">
            <div className="split-container posts-container">
                <h1>{strings.recent_posts}</h1>
                <div className="posts">
                    {
                        posts.map(post => {
                            getPostAuthor(post.author)
                            return (
                                <div className="post" key={v4()}>
                                    <div className="post-image-container">
                                        <img src={post.thumbnail} alt="post-thumbnail" className="post-image" />
                                        {
                                            Object.keys(user).length > 0 && (post.author === user.user._id || user.user.userType === "admin") &&
                                            <div className="post-image-buttons">
                                                <button className="post-image-button">
                                                    <Link to={`/editpost?id=${post._id}`}>
                                                        <FontAwesomeIcon className="post-image-button-icon" icon={faEdit} color="white" style={{ margin: "5px" }} />
                                                    </Link>
                                                </button>
                                                <button className="post-image-button" onClick={() => deletePost(post._id, user.accessToken, fetchPosts, [posts, setPosts, Indice, setIndice, setIsPostLoading, setMorePostsAvailable])}>
                                                    <FontAwesomeIcon className="post-image-button-icon" icon={faTrash} color="white" style={{ margin: "5px" }} />
                                                </button>
                                            </div>
                                        }
                                    </div>
                                    <div className="post-header">
                                        <Link to={"article?id=" + post._id}>
                                            <h1 className="post-title">{post.title}</h1>
                                        </Link>
                                        <span className="post-author">
                                            <FontAwesomeIcon className="author-icon" icon={faUser} color="white" style={{ margin: "5px" }} />
                                            {postAuthor}
                                        </span>
                                        <span className="post-category">
                                            <FontAwesomeIcon color="white" icon={faList} style={{ margin: "5px" }}></FontAwesomeIcon>
                                            {categories[post.category]}
                                        </span>
                                        <span className="post-category">
                                            <FontAwesomeIcon color="white" icon={faCalendar} style={{ margin: "5px" }}></FontAwesomeIcon>
                                            {new Date(post.date_posted).toLocaleTimeString() + " " + new Date(post.date_posted).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    posts.length === 0 && !isPostLoading &&
                    <h2 style={{textAlign:"center"}}>No posts are available!</h2>
                }
                {
                    isPostLoading &&
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                }
                {
                    morePostsAvailable &&
                    <button className="load-more" onClick={e => fetchPosts(posts, setPosts, Indice, setIndice, setIsPostLoading, setMorePostsAvailable)}>
                        Load More
                    </button>
                }
            </div>
        </div>
    );
}

export default Home;