const express = require('express');
const postModel = require('../models/post');
const postShouldExist = require('../utils/custom-validators/postShouldExist');
const { body, validationResult } = require('express-validator');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();
router.use(loginRequired);

const removePost = router.post('/', [
    body('post_id')
        .notEmpty()
        .bail()
        .custom(postShouldExist)
            .withMessage("Post doesn't exist!")
], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(406).json(errors);
        res.end();
    } else {
        let post_id = req.body.post_id;
        let post = await postModel.findOne({
            _id: post_id
        });
        if(post.author === req.user._id) {
            post.deleteOne();
        } else {
            if(req.user.userType !== "admin") {
                res.status(403);
                res.json({
                    success: 0
                });
                res.end();
            } else {
                post.deleteOne();
            }
        }
        res.json({
            success: 1
        });
        res.end();
    }
})

module.exports = removePost;