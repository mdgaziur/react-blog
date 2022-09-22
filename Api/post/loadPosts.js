const express = require('express')
const postModel = require('../models/post');

const router = express.Router();

const loadPost = router.post('/', async (req, res) => {
    let postIndice = parseInt(req.body.indice) || 0;
    let size = 5;
    let posts = await postModel.find();
    posts = posts.reverse();
    let paginated_posts = posts.slice((postIndice - 1) * size, postIndice * size);
    res.json(paginated_posts);
    res.end();
});

module.exports = loadPost;