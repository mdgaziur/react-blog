const userModel = require('../../models/user');

async function isUniqueName(name) {
    return userModel.findOne({
        name: name
    }).then((user) => {
        if(user) {
            return Promise.reject("Given name is already in use!");
        }
    });
}

module.exports = isUniqueName;