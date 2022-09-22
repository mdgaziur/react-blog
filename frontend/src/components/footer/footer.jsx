import React, { useState, useEffect, useContext } from 'react';
import strings from '../../strings';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { domain } from '../../utils/domain';

function Footer() {
    let [views, setViews] = useState("");
    let [user] = useContext(UserContext);
    let [postHistory, setPostHistory] = useState([]);

    useEffect(() => {
        async function fetchViews() {
            let apiUrl = domain + "/api/increaseViews";
            let res = await fetch(apiUrl);
            let json = await res.json();
            let views = json.views.views;
            views = views.toString().split("").join(" ");
            setViews(views);
        }
        fetchViews();
    }, []);
    useEffect(() => {
        setInterval(() => {
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            setPostHistory(posts);
        }, 2000);
    }, []);
    return (
        <div className="footer">
            <h1>{strings.blog_name}</h1>
            <div className="footer-containers">
                <div className="footer-s-container">
                    <h2>Links</h2>
                    <Link to="/home">{strings.home}</Link>
                    {user.user &&
                        <Link to="/settings">{strings.settings}</Link>
                    }
                </div>
                {
                    user.user ?
                        (user.user.userType === "admin" || user.user.userType === "moderator")
                            ?
                            <div className="footer-s-container">
                                <h2>Actions</h2>
                                <Link to="/newpost">{strings.create_new_post}</Link>
                                {
                                    user.user.userType === "admin" &&
                                    <Link to="/admin">{strings.admin_panel}</Link>
                                }
                            </div>
                            : ""
                        : ""
                }
                {
                    postHistory.length > 0 &&
                    <div className="footer-s-container">
                        <h2>History</h2>
                        {
                            postHistory.map(post => (
                                <div className="footer-history-post">
                                    <h3>{post.title}</h3>
                                    <Link to={`/article?id=${post._id}`}>
                                        <button className="read-again">
                                            Read Again
                                        </button>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                }
                <div className="footer-s-container">
                    <h2>Total Page Views</h2>
                    <h1>{views}</h1>
                </div>
            </div>
            <h5 style={{ color: "white", textAlign: "center" }}>© MD Gaziur Rahman Noor. All rights reserved</h5>
        </div >
    );
}

export default Footer;