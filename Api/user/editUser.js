const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const { body, validationResult } = require('express-validator');

const isUniqueName = require('../utils/isUniqueName');
const isUniqueEmail = require('../utils/isUniqueEmail');

const router = express.Router();

router.use(loginRequired);

const editUser = router.post('/', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let user = req.user;
    if(name) {
        let isUnique = !await isUniqueName(name);
        if(isUnique || user.name == name) {
            user.name = name;
        } else {
            res.status(406).json({
                errors: [{
                    location: "body",
                    msg: "There is already an account with given name!",
                    param: "name"
                }]
            });
            res.end();
            return;
        }
    }
    if(email) {
        let isUnique = !await isUniqueEmail(email);
        if(isUnique || email  === user.email) {
            user.email = email;
        } else {
            res.status(406).json({
                errors: [{
                    location: "body",
                    msg: "There is already an account with given email!",
                    param: "email"
                }]
            });
            res.end();
            return;
        }
    }
    user.save();
    res.json({
        success: 1
    });
    res.end();
});

module.exports = editUser;