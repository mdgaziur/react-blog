const express = require('express');
const { body, validationResult } = require('express-validator');
const postModel = require('../models/post');

const router = express.Router();

const getByCategory = router.post('/', [
    body('category')
        .notEmpty()
        .bail()
        .withMessage("Category is not specified")
        .isString()
        .withMessage("Category should be a string containing a number")
        .bail()
        .custom(category => {
            let validCategories = ["1", "2", "3", "4", "5", "6", "7"]
            return validCategories.includes(category);
        })
        .withMessage("Invalid category!")
], async (req, res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.json(errors);
        res.status(406);
        res.end();
    } else {
        let category = req.body.category;
        let postIndice = parseInt(req.body.indice) || 0;
        let posts = await postModel.find({
            category: category
        });
        posts = posts.reverse();
        let size = 10;
        let paginated_posts = posts.slice((postIndice - 1) * size, postIndice * size);
        let pagination_length = Math.ceil(posts.length / size);
        res.json({
            posts: paginated_posts,
            max: pagination_length
        });
        res.end();
    }
});

module.exports = getByCategory;