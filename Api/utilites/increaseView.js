const express = require('express');
const viewModel = require('../models/view');

const router = express.Router();

const increaseView = router.get('/', async (req, res) => {
    let views;
    views = await viewModel.find();
    if(views.length === 0) {
        views = await viewModel.create({
            views: 0
        });
    }
    views = views[0];
    views.views+=1;
    views.save();
    res.json({
        views: views
    });
    res.end();
});

module.exports = increaseView;