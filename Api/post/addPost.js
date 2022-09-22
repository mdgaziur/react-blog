const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const postModel = require('../models/post');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.use(loginRequired);

const addPost = router.post('/', [
    body('title')
        .notEmpty()
        .bail()
        .isLength({
            min: 10,
            max: 100
        })
        .withMessage("Title must be at least 10 charecters and at most 100 charecters long!"),
    body('thumbnail')
        .notEmpty()
        .withMessage("Post thumbnail is required"),
    body('data')
        .notEmpty(),
    body('category')
        .notEmpty()
], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(406);
        res.json(errors);
        res.end();
    }
    else {
        let user = req.user;
        if(user.userType !== "admin" && user.userType !== "moderator") {
            res.status(403);
            res.end();
        }
        else {
            let title = req.body.title, data = req.body.data, category = req.body.category, thumbnail = req.body.thumbnail;
            let post = await postModel.create({
                title: title,
                data: data,
                thumbnail: thumbnail,
                author: user._id,
                category: category
            });
            res.json(post);
            res.end();
        }
    }
});

module.exports = addPost;