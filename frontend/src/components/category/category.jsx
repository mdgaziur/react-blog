import React, { useContext, useEffect, useState } from 'react';
import strings, { categories } from '../../strings';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUser, faEdit, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons';
import fetchPostsByCategory from '../../utils/fetchPostsByCategory';
import { UserContext } from '../../contexts/userContext';
import getUserById from '../../utils/getUserById';
import { v4 } from 'uuid';
import deletePost from '../../utils/deletePost';

function AllPosts() {
    let [posts, setPosts] = useState([]);
    let [postAuthor, setPostAuthor] = useState("");
    let [Indice, setIndice] = useState(1);
    let [isPostLoading, setIsPostLoading] = useState(false);
    let [maxIndice, setMaxIndice] = useState(0);
    let { id } = useParams();
    useEffect(() => {
        fetchPostsByCategory(posts, setPosts, Indice, setIndice, setIsPostLoading, setMaxIndice, id);
    }, [id]);
    async function getPostAuthor(userID) {
        let author = await getUserById(userID);
        setPostAuthor(author.name);
    }
    let [user] = useContext(UserContext);
    return (
        <div className="allposts">
            {
                categories[id] ?
                    <div>
                        <h1 style={{ textAlign: "center" }}>{categories[id]} {strings.related_posts}</h1>
                        <div className="split-container posts-container">
                            <div className="posts">
                                {
                                    posts.length > 0 ?
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
                                                                <button className="post-image-button" onClick={() => deletePost(post._id, user.accessToken, fetchPostsByCategory, [posts, setPosts, Indice, setIndice, setIsPostLoading, setMaxIndice, id])}>
                                                                    <FontAwesomeIcon className="post-image-button-icon" icon={faTrash} color="white" style={{ margin: "5px" }} />
                                                                </button>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="post-header">
                                                        <Link to={"/article?id=" + post._id}>
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
                                        :
                                        !isPostLoading && <h3 style={{ textAlign: "center", width: "100%" }}>No posts are available in this category!</h3>
                                }
                            </div>
                            {
                                isPostLoading &&
                                <div className="loader-container">
                                    <div className="loader"></div>
                                </div>
                            }
                            <div className="pagination">
                                {Array.from(Array(maxIndice).keys()).map(val => (
                                    val === Indice - 1 ?
                                        <button className="pagination-button active" onClick={() => fetchPostsByCategory(posts, setPosts, Indice, setIndice, setIsPostLoading, setMaxIndice, id)}>{val + 1}</button>
                                        :
                                        <button className="pagination-button" onClick={() => fetchPostsByCategory(posts, setPosts, Indice, setIndice, setIsPostLoading, setMaxIndice, id)}>{val + 1}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                    :
                    <h1>Invalid category!</h1>
            }
        </div>
    );
}

export default AllPosts;