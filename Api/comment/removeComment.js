const express = require('express');
const { body, validationResult } = require('express-validator');
const commentModel = require('../models/comment');
const commentShouldExist = require('../utils/custom-validators/commentShouldExist');

const router = express.Router();

const removeComment = router.post('/', [
    body('comment_id')
        .notEmpty()
        .bail()
        .custom(commentShouldExist)
            .withMessage("Comment does not exist!")
], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json(errors);
        res.end();
    } else {
        let comment_id = req.body.comment_id;
        await commentModel.findOneAndRemove({
            _id: comment_id
        });
        res.json({
            success: 1
        });
        res.end();
    }
})

module.exports = removeComment