const express = require('express');
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user');

const router = express.Router();

const getUserById = router.post('/', [
    body('user_id')
        .notEmpty()
],
    async (req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(406).json(errors);
            res.end();
        } else {
            let userID = req.body.user_id;
            let user = await userModel.findOne({
                _id: userID
            });
            if(!user) {
                res.status(404).json({
                    errors: [{
                        location: "body",
                        msg: "User not found!",
                        param: "user_id"
                    }]
                });
                res.end();
            } else {
                user.password = undefined;
                user.accessTokens = undefined;
                res.json(user);
                res.end();
            }
        }
});

module.exports = getUserById;