const commentModel = require('../../models/comment');

/**
 * Gets comment Id and returns true or false according to it's existance
 * @param {String} comment_id 
 * @returns {boolean}
 */
async function commentShouldExist(comment_id) {
    let comment = await commentModel.findOne({
        _id: comment_id
    });
    return comment ? true : false;
}

module.exports = commentShouldExist;