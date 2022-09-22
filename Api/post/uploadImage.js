const express = require('express');
const multer = require('multer');
const { v4 } = require('uuid');
const loginRequired = require('../middlewares/loginRequired');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `media/images`);
    },
    filename: (req, file, cb) => {
        let filename = v4();
        cb(null, filename);
    }
})

const uploader = multer({storage: storage});

const router = express.Router();
router.use(loginRequired);

const uploadImage = router.post('/', uploader.single('image') ,async (req, res) => {
    let domain = process.env.DEVELOPMENT_SERVER ? "" : "https://mdgaziur-jagatpuri-darbar-sharif.glitch.me";
    if(req.file) {
        res.json({
            success: 1,
            file: {
                url: domain+`/images/${req.file.filename}`
            }
        });
        res.end();
    } else {
        res.json({
            success: 0
        });
        res.end();
    }
})

module.exports = uploadImage;