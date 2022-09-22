const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

/**
 *
 * Returns userId if accessToken is valid otherwise undefined.
 * @param {String} accessToken
 * @returns {String | undefined} UserId or undefined
 */
function verifyAccessToken(accessToken) {
    
    try {
        let payload = jwt.verify(accessToken || '', process.env.JWT_SECRET_KEY);
        return payload.uid;
    } catch(err) {
        return undefined;
    }
}

module.exports = verifyAccessToken;