const userModel = require('../models/user');

async function isUniqueEmail(email) {
    return await userModel.findOne({
        email: email
    });
}

module.exports = isUniqueEmail;