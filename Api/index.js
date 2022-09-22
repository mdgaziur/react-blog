const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

//Get all the environment variables from .env
require('dotenv').config();

//Get all the routes
const auth = require('./auth/auth');
const user = require('./user/user');
const post = require('./post/post');
const comment = require('./comment/comment');
const FetchUrl = require('./utilites/fetchUrl');
const increaseView = require('./utilites/increaseView');

//Connect to the database
if (process.env.DEVELOPMENT_SERVER) {
    mongoose.connect('mongodb://localhost/jagatpuri-darbar-sharif', {
        useNewUrlParser: true, useUnifiedTopology: true,
    });
} else {
    let uri = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.wczoe.mongodb.net/jagatpuri-blog?retryWrites=true&w=majority`;
    mongoose.connect(uri, {
      useNewUrlParser: true, useUnifiedTopology: true
    });
}

mongoose.connection.on('err', (err) => {
    console.log("Failed to connect to database!");
    console.log("Error Log: ");
    console.log(err);
});

mongoose.connection.on('connected', () => {
    console.log("Database connected successfully!");
});

//Configure the app
const app = express();
app.use(express.static('./media'));
const port = process.env.DEVELOPMENT_SERVER ? 8080 : process.env.PORT;
app.use(express.json({
    limit: '10mb'
}));
app.use(cors({
    origin: "https://jagatpuri-darbar-sharif.tk"
}));
app.use(morgan("dev"));
app.use(helmet());
app.disable('x-powered-by');
app.use((err, req, res, next) => {
    if(err) {
        console.log(err.stack);
        res.status(500).json({
            error: "Server Error!"
        });
    }
    else {
        next();
    }
});

//Register all the routes
app.use('/api/auth/login', auth.login);
app.use('/api/auth/register', auth.register);
app.use('/api/auth/logout', auth.logout);
// app.use('/auth', auth.passwordReset);
app.use('/api/user/get/accesstoken', user.getUserByAccessToken);
app.use('/api/user/get/id', user.getUserById);
app.use('/api/user/edit/profile', user.editUser);
app.use('/api/user/edit/profile-pic', user.updateProfilePic);
app.use('/api/post/get/all', post.getAllPosts);
app.use('/api/post/get/id', post.getById);
app.use('/api/post/get/author_id', post.getPostByAuthorId);
app.use('/api/post/get/comments', post.getComments);
app.use('/api/post/get/category', post.getByCategory);
app.use('/api/post/create_post', post.addPost);
app.use('/api/post/edit_post', post.editPost);
app.use('/api/post/delete', post.removePost);
app.use('/api/post/load', post.loadPosts);
app.use('/api/post/paginate', post.paginate);
// app.use('/comment', comment.getCommentByID);
// app.use('/comment', comment.getCommentByPost);
app.use('/api/comment', comment.addComment);
app.use('/api/post/upload/image', post.uploadImage);
// app.use('/comment', comment.editComment);
// app.use('/comment', comment.removeComment);

app.use('/api/utils/fetchUrl', FetchUrl);
app.use('/api/increaseViews', increaseView);

console.log(`Listening on port: ${port}`);
app.listen(port);