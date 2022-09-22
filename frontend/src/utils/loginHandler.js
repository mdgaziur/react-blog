import { domain } from "./domain";

/**
 * Gets the username and password and sends that to the api and gets the accesstoken
 * @param {String} username 
 * @param {String} password 
 * @returns Return json object response from api
 */
async function loginHandler(email, password) {
    let apiUrl = domain+'/api/auth/login';
    let postData = {
        email: email,
        password: password
    }
    try {
        let res = await fetch(apiUrl, {
            method: "POST",
            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        if (!res.ok && res.statusText === 'net::ERR_NAME_NOT_RESOLVED') {
            resJson = {
                errors: [{
                    msg: "Failed to connect to server!"
                }]
            }
        }
        let resJson = await res.json();
        return resJson;
    }
    catch (e) {
        return {
            errors: [
                {
                    msg: "Failed to connect to the server",
                    field: "network"
                }
            ]
        }
    }
}

export default loginHandler;