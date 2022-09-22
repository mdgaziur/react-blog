const express = require('express');
const postModel = require('../models/post');

const router = express.Router();

const getAllPosts = router.all('/', async (req, res) => {
    let posts = await postModel.find();
    res.json(posts);
    res.end();
})

module.exports = getAllPosts;