const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        minlength: 3,
        required: true,
        trim: true
    },
    joined: {
        type: Object,
        required: true,
        default: new Date()
    },
    userType: {
        type: String,
        default: 'member',
        enum: ['admin', 'member', 'moderator'],
        default: 'member'
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }],
    accessTokens: [{
        type: String
    }]
});

module.exports = mongoose.model('user', userSchema);