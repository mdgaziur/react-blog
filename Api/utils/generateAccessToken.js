const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

/**
 * Gets the userID and returns the signed JSON web token
 * @param {String} userID User id to sign
 * @return {String} Signed userID inside a JSON web token
 */
function generateAccessToken(userID) {
    let accessToken = jwt.sign({ uid: userID }, process.env.JWT_SECRET_KEY);
    return accessToken;
}

module.exports = generateAccessToken;
