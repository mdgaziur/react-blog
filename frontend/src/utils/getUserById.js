import { domain } from "./domain";

async function getUserById(userId) {
    let postData = {
        user_id: userId
    }

    let res = await fetch(domain+'/api/user/get/id', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });

    if(res.ok) {
        return await res.json();
    } else {
        return null;
    }
}

export default getUserById;