import { Box } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import getPostsByAuthorId from '../../utils/getPostsByAuthorId';

function Profile() {
    let [user, setUser] = useContext(UserContext);
    let [posts, setPosts] = useState([]);

    useEffect(() => {
        user.user ? getPosts() : undefined;
    }, [user]);

    async function getPosts() {

        setPosts(await getPostsByAuthorId(user.user._id));
    }
    return (
        <div className="profile-container">
            {
                user.user ?
                    <Box boxShadow="4" className="profile">
                        <Box boxShadow="4" className="profile-picture">
                            <img src="https://source.unsplash.com/random/300x300?gravity=center" alt="" />
                        </Box>
                        <h1>
                            {user.user.name}
                        </h1>
                        <p className="join-date">
                            Joined at {(new Date(user.user.joined)).toLocaleTimeString() + " " + (new Date(user.user.joined)).toLocaleDateString()}
                        </p>
                    </Box>
                    :
                    <h1>You are not authorized to view this page</h1>
            }
            {
                user.user &&
                <Box boxShadow="4" className="user-posts">
                    <h2>Posts by this user</h2>
                    <div className="posts">
                        {
                            posts.map(post => (
                                <Box boxShadow="4" className="post">
                                    <h2 className="post-name">{post.title}</h2>
                                    <Link className="post-readme" to={"/article?id="+post._id}> Read more {'->'}</Link>
                                </Box>
                            ))
                        }
                    </div>
                </Box>
            }
        </div>
    )
}

export default Profile;