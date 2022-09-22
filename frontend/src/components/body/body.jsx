import React from 'react';
import {Route} from 'react-router-dom';
import Admin from '../admin/admin';
import AllPosts from '../allposts/allposts';
import Article from '../article/article';
import Category from '../category/category';
import EditPost from '../editPost/editPost';
import Home from '../home/home';
import NewPost from '../newPost/newPost';
import Profile from '../profile/profile';
import Settings from '../settings/settings';
import UserPosts from '../userPosts/userPosts';

function Body({ setLoginVisible }) {
    return (
        <div className="body">
            <Route path='/' exact component={Home}></Route>
            <Route path='/article' exact component={Article}></Route>
            <Route path='/newpost' exact component={NewPost}></Route>
            <Route path='/editpost' exact component={EditPost}/>
            <Route path='/admin' exact component={Admin}/>
            <Route path='/settings' exact component={() => <Settings setLoginVisible={setLoginVisible}/>}/>
            <Route path='/profile' exact component={Profile}></Route>
            <Route path='/all_posts' exact component={AllPosts}></Route>
            <Route path='/user_posts' exact component={UserPosts}/>
            <Route path='/category/:id' exact component={Category}/>
        </div>
    );
}

export default Body;