import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faTag, faList, faUser, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Admin() {
    return(
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <div className="admin-panel-body">
                <div className="users">
                    <div className="users-search-container">
                        <input type="text" placeholder="Search for user" className="user-search"/>
                    </div>
                    <div className="users-container">
                        <div className="user">
                            <span className="user-name">Lorem, ipsum.</span>
                            <button className="user-delete">Delete</button>
                        </div>
                        <div className="user">
                            <span className="user-name">Lorem, ipsum.</span>
                            <button className="user-delete">Delete</button>
                        </div>
                        <div className="user">
                            <span className="user-name">Lorem, ipsum.</span>
                            <button className="user-delete">Delete</button>
                        </div>
                        <div className="user">
                            <span className="user-name">Lorem, ipsum.</span>
                            <button className="user-delete">Delete</button>
                        </div>
                    </div>
                </div>
                <div className="posts">
                    <div className="post">
                        <div className="post-image-container">
                            <img src="https://dummyimage.com/600x400/f9f9f9/ed890" alt="post-thumbnail" className="post-image"/>
                            <div className="post-image-buttons">
                                <button className="post-image-button">
                                    <FontAwesomeIcon className="post-image-button-icon" icon={faEdit} color="white" style={{margin:"5px"}}/>
                                </button>
                                <button className="post-image-button">
                                    <FontAwesomeIcon className="post-image-button-icon" icon={faTrash} color="white" style={{margin:"5px"}}/>
                                </button>
                            </div>
                        </div>
                        <div className="post-header">
                            <h1 className="post-title">Lorem ipsum dolor sit.</h1>
                            <span className="post-author">
                                <FontAwesomeIcon className="author-icon" icon={faUser} color="white" style={{margin:"5px"}}/>
                                mdgaziur001
                            </span>
                            <span className="post-category">
                                <FontAwesomeIcon color="white" icon={faList} style={{margin:"5px"}}></FontAwesomeIcon>
                                lorem
                            </span>
                            <div className="post-tags">
                                <span className="tag-icon">
                                    <FontAwesomeIcon className="tag-icon" color="white" icon={faTags}></FontAwesomeIcon>
                                    <span className="post-tag">
                                        <FontAwesomeIcon className="tag-icon" color="white" icon={faTag}></FontAwesomeIcon>
                                        Tag
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="post-body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quasi error odio dolorem ipsum minima alias similique officiis magnam suscipit vitae laboriosam totam illo laborum nostrum fuga ab et, architecto, voluptates molestias deserunt. Earum quidem praesentium consequatur debitis libero eos odit aut ex in molestias, velit sint error totam necessitatibus!</p>
                            <Link to="/article">Read more {'->'}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;