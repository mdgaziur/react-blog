const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

/**
 * Gets the user and password and compares the salted password with given password
 * @param {Object} user 
 * @param {String} password 
 * @returns {Boolean} Returns true if password matches
 */
function isCorrectPassword(user, password){
    return bcrypt.compareSync(password, user.password);
}

module.exports = isCorrectPassword;