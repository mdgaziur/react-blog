const express = require('express');
const postModel = require('../models/post');
const postShouldExist = require('../utils/custom-validators/postShouldExist');
const { body, validationResult } = require('express-validator');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();
router.use(loginRequired);

const editPost = router.post('/', [
    body('post_id')
        .notEmpty()
        .bail()
        .custom(postShouldExist)
        .withMessage("Post does not exist!")
], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(406).json(errors);
        res.end();
    } else {
        let postId = req.body.post_id;
        let postTitle = req.body.title;
        let postData = req.body.data;
        let postThumbnail = req.body.thumbnail;
        
        let post = await postModel.findOne({
            _id: postId
        });
        if(postTitle) {
            post.title = postTitle;
        }
        if(postData) {
            post.data = postData;
        }
        if(postThumbnail) {
            post.thumbnail = postThumbnail;
        }
        post.save();
        res.json({
            success: 1
        });
        res.end();
    }
});

module.exports = editPost;