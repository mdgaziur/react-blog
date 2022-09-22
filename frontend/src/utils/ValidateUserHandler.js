import { domain } from "./domain";

/**
 * Check if the given accesstoken is valid
 * @param {Object} user The object containing the accesstoken
 * @returns Return user if the accesstoken is valid otherwise null
 */
async function ValidateUserHandler(user) {
    let apiUrl = domain+'/api/user/get/accesstoken';
    let postData = {
        accessToken: user.accessToken
    }
    try {
        let res = await fetch(apiUrl, {
            method: "POST",
            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        if (!res.ok) {
            return null;
        } else {
            let user = await res.json();
            return user;    
        }
    }
    catch (e) {
        return null;
    }
}

export default ValidateUserHandler;