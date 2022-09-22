const mongoose = require("mongoose");

const viewModel = new mongoose.Schema({
    views: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('views', viewModel);