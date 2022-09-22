const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const router = express.Router();

const logout = router.post('/', [
    body('accessToken')
        .notEmpty()
], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json(errors);
        res.end();
    } else {
        let accessToken = req.body.accessToken;
        await jwt.verify(accessToken, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if(err) {
                res.json(err);
                res.end();
            } else {
                let uid = payload.uid;
                let user = await userModel.findOne({
                    _id: uid
                });
                let removedAccessToken = false;
                user.accessTokens.forEach((token, idx) => {
                    if(token === accessToken) {
                        user.accessTokens.splice(idx);
                        removedAccessToken = true;
                    }
                });
                if(removedAccessToken) {
                    res.json({
                        success: 1
                    });
                } else {
                    res.json({
                        success: 0,
                        error: "Accesstoken is already removed!"
                    });
                }
                res.end();
            }
        });
    }
});

module.exports = logout;