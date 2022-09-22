const express = require('express');
const { body, validationResult } = require('express-validator');
const commentModel = require('../models/comment');
const commentShouldExist = require('../utils/custom-validators/commentShouldExist');

const router = express.Router();

const editComment = router.post('/', [
    body('comment_id')
        .notEmpty()
        .bail()
        .custom(commentShouldExist)
            .withMessage('Comment does not exist!')
    ,
    body('comment_data')
        .notEmpty()
        .bail()
        .isString()
], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json(errors);
        res.end();
    }
    else {
        let comment_id = req.body.comment_id;
        let comment_data = req.body.comment_data;
        let comment = await commentModel.findOne({
            _id: comment_id
        });
        comment.comment = comment_data;
        comment.save();
        res.json({
            success: 1,
            comment: comment
        });
        res.end();
    }
});

module.exports = editComment;