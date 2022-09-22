const userModel = require('../../models/user');

async function isUniqueEmail(email) {
    return userModel.findOne({
        email: email
    }).then((user) => {
        if(user) {
            return Promise.reject("Email is already in use!");
        }
    });
}

module.exports = isUniqueEmail;