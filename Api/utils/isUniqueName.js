const userModel = require('../models/user');

async function isUniqueName(name) {
    return await userModel.findOne({
        name: name
    });
}

module.exports = isUniqueName;