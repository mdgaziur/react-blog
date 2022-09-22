const express = require('express');
const postModel = require('../models/post');
const postShouldExist = require('../utils/custom-validators/postShouldExist');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const getById = router.post('/', [
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
        let postId = req.body.post_id;
        let post = await postModel.findOne({
            _id: postId
        });
        res.json(post);
        res.end();
    }
});

module.exports = getById;