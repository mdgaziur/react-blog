//Import modules form node_modules
const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

//Import project modules
const userModel = require('../models/user');
const generateAccessToken = require('../utils/generateAccessToken');

//Import all the custom validators
const isUniqueEmail = require('../utils/custom-validators/isUniqueEmail');
const isUniqueName = require('../utils/custom-validators/isUniqueName');

const router = express.Router();

/**
 * This route handles register requests
 */
const register = router.post('/', [
    body('email')
        .isEmail()
        .bail()
        .custom(isUniqueEmail),
    body('name')
        .isLength({
            min: 3,
            max: 40
        })
        .withMessage("The length of name should be between 3 and 40 charecters!")
        .bail()
        .custom(isUniqueName),
        body('password')
        .isLength({
            min: 8,
            max: 100
        })
        .bail()
        .notEmpty()
] , async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(406).json(errors);
        res.end();
    } else {
        let email = req.body.email;
        let name = req.body.name;
        let password = req.body.password;
        //Hash and salt the password
        password = bcrypt.hashSync(password, 10);
        let user = await userModel.create({
            name: name,
            email: email,
            password: password
        });
        let accessToken = generateAccessToken(user._id.toString());
        user.accessTokens.push(accessToken);
        user.save();
        res.json({
            accessToken: accessToken
        });
        res.end();
    }
});

module.exports = register;