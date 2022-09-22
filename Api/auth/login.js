//Import modules form node_modules
const express = require('express');
const { body, validationResult } = require('express-validator');

//Import project modules
const userModel = require('../models/user');
const generateAccessToken = require('../utils/generateAccessToken');
const isCorrectPassword = require('../utils/isCorrectPassword');

//Import custom validators
const userShouldExist = require('../utils/custom-validators/userShouldExist');

const router = express.Router();

/**
 * This route handles user login requests
 */
const login = router.post('/', [
    body('email')
        .notEmpty()
        .bail()
        .isEmail()
        .withMessage("Invalid email address")
        .bail()
        .custom(userShouldExist)
        .withMessage("User does not exist!"),
    body('password')
        .isLength({
            min: 8,
            max: 100
        })
        .withMessage("Password length must be between 8 charecters and 100 charecters!")
        .bail()
        .notEmpty()
        .withMessage("No password given!")

] , async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(406).json(errors);
        res.end();
    } else {
        let email = req.body.email;
        let password = req.body.password;
        let user = await userModel.findOne({
            email: email
        });
        if(!user) {
            res.json({
                errors: [{
                    location: "body",
                    msg: "No such user!",
                    field: "email"
                }]
            });
            res.end();
        }
        else {
            let isCorrectPwd = isCorrectPassword(user, password);
            if(isCorrectPwd) {
                let accessToken = generateAccessToken(user._id.toString());
                user.accessTokens.push(accessToken);
                user.save();
                user = JSON.parse(JSON.stringify(user));
                user.password = undefined;
                user.accessTokens = undefined;
                res.json({
                    accessToken: accessToken,
                    user: user
                });
                res.end();
            } else {
                res.json({
                    errors: [{
                        location: "body",
                        msg: "Wrong password",
                        field: "password"
                    }]
                });
                res.end();
            }
        }
    }
});

module.exports = login;