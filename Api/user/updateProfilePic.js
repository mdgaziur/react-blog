const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const fs = require('fs');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../media/profile_pictures');
    },
    filename: function(req, file, cb) {
        if(fs.existsSync(`../media/profile_pictures/${req.user._id.toString()}.png`)) {
            fs.unlinkSync(`../media/profile_pictures/${req.user._id.toString()}`);
        }
        cb(null, req.user._id.toString()+'.png');
    }
})

let upload = multer({ storage: storage });

const router = express.Router();

const updateProfilePic = router.post('/', upload.single('profile-pic'),(req, res) => {
    let file = req.file;
    if(!file) {
        res.status(406).json({
            success: 0,
            errors: [{
                location: "body",
                msg: "No profile picture specified!",
                param: "profile-pic"
            }]
        });
        res.end();
    }
    else {
        res.send(file);
    }
});

module.exports = updateProfilePic;