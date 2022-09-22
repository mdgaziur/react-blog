const postModel = require('../../models/post');

/**
 * Checks if any post exists with that id
 * @param {String} post_id 
 * @return {Boolean} Boolean value indicating weather the post exists
 */
async function postShouldExist(post_id) {
    let post = await postModel.findOne({
        _id: post_id
    });
    return post ? true : false;
}

module.exports = postShouldExist;