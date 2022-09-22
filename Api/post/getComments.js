const express = require('express');
const { body, validationResult } = require('express-validator');
const postShouldExist = require('../utils/custom-validators/postShouldExist');
const postModel = require('../models/post');

const router = express.Router();

const getComments = router.post('/', [
    body('post_id')
    .notEmpty()
    .bail()
    .custom(postShouldExist)
], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json(errors);
        res.end();
    } else {
        let post_id = req.body.post_id;
        let comments = await postModel.find({
            post_id: post_id
        });
        res.json(comments);
        res.end();
    }
});

module.exports = getComments;