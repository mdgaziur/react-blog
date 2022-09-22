const express = require('express');
const { body, validationResult } = require('express-validator');
const commentModel = require('../models/comment');
const postShouldExist = require('../utils/custom-validators/postShouldExist');
const loginRequired = require('../middlewares/loginRequired');
const postModel = require('../models/post');


const router = express.Router();
router.use(loginRequired);

const addComment = router.post('/', [
    body('post_id')
        .notEmpty()
        .bail()
        .custom(postShouldExist)
            .withMessage("Post doesn't exists!")
        ,
    body('comment')
        .notEmpty()
        .bail()
        .isString()
], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json(errors);
        res.end()
    }
    else {
        let post_id = req.body.post_id;
        let post = await postModel.findOne({
            _id: post_id
        });
        let comment_data = req.body.comment;
        let comment = commentModel.create({
            post_id: post_id,
            comment: comment_data,
            author: req.user._id
        });
        post.comments.push(comment._id);
        post.save();
        res.json(comment);
        res.end();
    }
});

module.exports = addComment;