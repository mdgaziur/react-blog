const expressRouter = require('express').Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const getUserByAccessToken = expressRouter.post('/', [
    body('accessToken')
        .notEmpty()
    ],
    async (req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json(errors);
            res.status(406);
            res.end();
        } else {
            let accessToken = req.body.accessToken;
            await jwt.verify(accessToken, process.env.JWT_SECRET_KEY, async (err, payload) => {
                if(err) {
                    res.json(err);
                    res.status(406);
                    res.end();
                } else {
                    let uid = payload.uid;
                    let user = await userModel.findOne({
                        _id: uid
                    });
                    if(!user) {
                        res.json({
                            errors: [{
                                location: "body",
                                msg: "User not found!",
                                param: "accessToken"
                            }]
                        });
                        res.status(404);
                        res.end();
                    } else if(user.accessTokens.includes(accessToken)) {
                        user.password = undefined;
                        user.accessTokens = undefined;
                        res.json({
                            accessToken: accessToken,
                            user: user
                        });
                        res.end();
                    } else {
                        res.status(410);
                        res.end();
                    }
                }
            });
        }
    }
);

module.exports = getUserByAccessToken;