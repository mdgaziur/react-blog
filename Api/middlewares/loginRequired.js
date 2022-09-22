const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

async function loginRequired(req, res, next) {
    let accessToken = req.headers.authorization ? req.headers["authorization"]: '';
    await jwt.verify(accessToken, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) {
            res.status(403).json(err);
            res.end();
        } else {
            let user_id =  payload.uid;
            let user = await userModel.findOne({
                _id: user_id
            });
            if(!user) {
                res.status(403).json({
                    error: "Invalid accesstoken!"
                });
                res.end();
            } else {
                if(user.accessTokens.includes(accessToken)) {
                    req.user = user;
                    next();
                } else {
                    res.status(403).json({
                        error: "Invalid or expired accesstoken! Login again!"
                    });
                    res.end();
                }
            }
        }
    });
}

module.exports = loginRequired;