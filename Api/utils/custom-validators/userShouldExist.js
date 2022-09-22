const userModel = require('../../models/user');

/**
 * Gets email and checks if there is any user with that email
 * @param {String} email 
 * @return Returns true if exists else false
 */
async function userShouldExist(email){
    let user = await userModel.findOne({
        email: email
    });
    return user ? true : false;
}

module.exports = userShouldExist;