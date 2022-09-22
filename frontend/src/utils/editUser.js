import { domain } from "./domain";

async function editUser({ name, email, newPassword, accessToken }) {
    let postBody = {
        name: name,
        email: email,
        newPassword: newPassword
    }
    let res = await fetch(domain+'/api/user/edit/profile', {
        method: "POST",
        headers: {
            "authorization": accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postBody)
    });

    let json = await res.json();

    if(!res.ok) {
        alert(JSON.stringify(json.errors) || "Failed to edit user!");
    } else {
        window.location.href = window.location;
    }
}

export default editUser;