import React, { useContext, useEffect, useState } from 'react';
import strings, { categories } from '../../strings';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUser, faEdit, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons';
import paginatePosts from '../../utils/paginatePosts';
import { UserContext } from '../../contexts/userContext';
import getUserById from '../../utils/getUserById';
import { v4 } from 'uuid';
import deletePost from '../../utils/deletePost';
import getPostsByAuthorId from '../../utils/getPostsByAuthorId';

function AllPosts() {
    let [user] = useContext(UserContext);
    let [posts, setPosts] = useState([]);
    let [postAuthor, setPostAuthor] = useState("");
    let [Indice, setIndice] = useState(1);
    let [isPostLoading, setIsPostLoading] = useState(false);
    let [maxIndice, setMaxIndice] = useState(0);
    useEffect(() => {
        (async function () {
            user.user ? setPosts(await getPostsByAuthorId(user.user._id)) : undefined;
        })();
    }, [user]);
    async function getPostAuthor(userID) {
        let author = await getUserById(userID);
        setPostAuthor(author.name);
    }
    return (
        <div className="allposts">
            {
                user.user ?
                posts ?
                <div>
                    <h1 style={{ textAlign: "center" }}>{strings.your_posts}</h1>
                    <div className="split-container posts-container">
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
                                                        <button className="post-image-button" onClick={() => deletePost(post._id, user.accessToken, paginatePosts, [posts, setPosts, Indice, setIndice, setIsPostLoading, setMaxIndice])}>
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
                            }
                        </div>
                        {
                            isPostLoading &&
                            <div className="loader-container">
                                <div className="loader"></div>
                            </div>
                        }
                        {
                            isPostLoading &&
                            <div className="loader-container">
                                <div className="loader"></div>
                            </div>
                        }
                        <div className="pagination">
                            {Array.from(Array(maxIndice).keys()).map(val => (
                                val === Indice - 1 ?
                                    <button className="pagination-button active" onClick={() => paginatePosts(posts, setPosts, val + 1, setIndice, setIsPostLoading, setMaxIndice)}>{val + 1}</button>
                                    :
                                    <button className="pagination-button" onClick={() => paginatePosts(posts, setPosts, val + 1, setIndice, setIsPostLoading, setMaxIndice)}>{val + 1}</button>
                            ))}
                        </div>
                    </div>
                </div>
                :
                !isPostLoading && <h1 style={{textAlign:"center"}}>You haven't created any posts</h1>
                :
                <h1 style={{textAlign:"center"}}>You are not allowed to see this page</h1>
            }
        </div>
    );
}

export default AllPosts;