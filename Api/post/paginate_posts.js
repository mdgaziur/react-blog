const express = require('express')
const postModel = require('../models/post');

const router = express.Router();

const paginate = router.post('/', async (req, res) => {
    let postIndice = parseInt(req.body.indice) || 0;
    let size = 10;
    let posts = await postModel.find();
    posts = posts.reverse();
    let paginated_posts = posts.slice((postIndice - 1) * size, postIndice * size);
    let pagination_length = Math.ceil(posts.length / size);
    res.json({
        posts: paginated_posts,
        max: pagination_length
    });
    res.end();
});

module.exports = paginate;