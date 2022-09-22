const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    data: {
        type: Map,
        required: true
    },
    date_posted: {
        type: Object,
        required: true,
        default: new Date()
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
});

module.exports = mongoose.model('post', postSchema);