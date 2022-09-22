const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('commentSchema', commentSchema);