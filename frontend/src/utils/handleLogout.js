import { v4 } from "uuid";
import ValidateUserHandler from "./ValidateUserHandler";
import { domain } from './domain';

async function handleLogout(user, setUser, closer, setErrors, errors) {
    let isValidUser = await ValidateUserHandler(user);
    let apiUrl = domain+'/api/auth/logout';
    if(isValidUser) {
        try{
            //Now revoke the accesstoken by sending a request with the accesstoken to the api
            let postData = {
                accessToken: user.accessToken
            }
            let res = await fetch(apiUrl, {
                method: "POST",
                
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if(!res.ok) {
                let Errors = res.map(err => {
                    let key = v4();
                    return {
                        msg: err.msg,
                        key: key
                    }
                });
                setErrors([...errors, Errors]);
            } else if (!res.ok) {
                let Errors = [{
                    msg: "Failed to logout: Cannot connect to the server",
                    key: v4()
                }]
                setErrors([...errors, Errors]);
            }else {
                setUser({});
                localStorage.removeItem('user');
                closer();
            }
        }
        catch(e) {
            let Errors = [{
                msg: e,
                key: v4()
            }]
            setErrors([...errors, Errors]);
        }
    }
}

export default handleLogout;