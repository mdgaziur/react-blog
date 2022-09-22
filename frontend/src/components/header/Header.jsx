import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import strings from '../../strings';
import ValidateUserHandler from '../../utils/ValidateUserHandler';

function Header({ loginVisible, setLoginVisible, registerVisible, setRegisterVisible, logoutVisible, setLogoutVisible }) {
    let [user, setUser] = useContext(UserContext);
    function toggleNav() {
        let nav = document.querySelector('.header-nav');
        let body = document.getElementsByTagName("body")[0];
        body.style.overflow !== "hidden" ? body.style.overflow = "hidden" : body.style.overflow = "auto";
        nav.classList.toggle("header-nav-visible");
        let hamburger = document.querySelector('.hamburger');
        hamburger.classList.toggle('hamburger-toggled');
    }
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        //Check if user is saved in localstorage. If saved, validate that user by using the ValidateUserHandler function
        let savedUser = JSON.parse(localStorage.getItem("user"));
        if (!savedUser || !savedUser.accessToken) {
            return;
        } else {
            //Check if the accesstoken is valid
            async function validateaccessToken() {
                setUser(savedUser);
                let User = await ValidateUserHandler(savedUser);
                if (User) {
                    //That means the function returned the user. Set the user
                    setUser(User);
                }
            }
            validateaccessToken();
        }
    }, []);

    return (
        <div className="header">
            <div className="header-nav">
                <Link to='/'><button className="nav-button">{strings.home}</button></Link>
                <Link to='/all_posts'><button className="nav-button">{strings.all_posts}</button></Link>
                {
                    Object.keys(user).length > 0 ? user.user ? (user.user.userType === "admin" || user.user.userType === "moderator") &&
                    <Link to='/user_posts'><button className="nav-button">{strings.your_posts}</button></Link>
                    :""
                    :""
                }
                {
                    Object.keys(user).length > 0 &&
                    <Link to='/profile'><button className="nav-button">{user.user.name}</button></Link>
                }
                {
                    Object.keys(user).length > 0 ? user.user ? (user.user.userType === "admin" || user.user.userType === "moderator") &&
                    <Link to='/newpost'><button className="nav-button">{strings.create_new_post}</button></Link>
                    : ""
                    : ""
                }
                {
                    Object.keys(user).length > 0 &&
                    <Link to='/settings'><button className="nav-button">{strings.settings}</button></Link>
                }
                {
                    Object.keys(user).length === 0 &&
                    <button className="nav-button" onClick={() => setLoginVisible(!loginVisible)}>{strings.login}</button>
                }
                {
                    Object.keys(user).length === 0 &&
                    <button className="nav-button" onClick={() => setRegisterVisible(!registerVisible)}>{strings.register}</button>
                }
                {
                    Object.keys(user).length > 0 &&
                    <button className="nav-button" onClick={() => setLogoutVisible(!logoutVisible)}>{strings.logout}</button>
                }
            </div>
            <div className="hamburger" onClick={toggleNav}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1>
                {strings.blog_name}
            </h1>
            {/* <div className="searchBar">
                <label>{strings.search}</label>
                <div className="searchbar-container">
                    <input type="text" placeholder="Search anything..."></input>
                    <button className="search-button">
                        <span className="search-button-icon">&#9906;</span>
                    </button>
                </div>
            </div> */}
            <div className="nav-categories">
                <Link className="nav-cat-button" to={"/category/1"}><button>{strings.islam}</button></Link>
                <Link className="nav-cat-button" to={"/category/2"}><button>{strings.islam_and_life}</button></Link>
                <Link className="nav-cat-button" to={"/category/3"}><button>{strings.quran_and_hadith}</button></Link>
                <Link className="nav-cat-button" to={"/category/4"}><button>{strings.atheist}</button></Link>
                <Link className="nav-cat-button" to={"/category/5"}><button>{strings.dharma_beboshayee}</button></Link>
                <Link className="nav-cat-button" to={"/category/6"}><button>{strings.sayeedul_aiyad_sharif}</button></Link>
                <Link className="nav-cat-button" to={"/category/7"}><button>{strings.other}</button></Link>
            </div>
        </div>
    )
}

export default Header;