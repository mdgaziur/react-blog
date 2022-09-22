const express = require('express');
const postModel = require('../models/post');
const { body, validationResult } = require('express-validator');
const userShouldExist = require('../utils/custom-validators/userShouldExist');

const router = express.Router();

const getPostByAuthorId = router.post('/', [
    body('author_id')
        .notEmpty()
        .bail()
        .custom(userShouldExist)
        .withMessage("User doesn't exists!")
], async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(406).json(errors);
        res.end();
    } else {
        let author_id = req.body.author_id;
        let posts = await postModel.find({
            author: author_id
        });
        res.json(posts);
        res.end();
    }
})

module.exports = getPostByAuthorId;