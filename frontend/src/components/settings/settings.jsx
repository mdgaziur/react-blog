import { Box, Button, TextField } from '@material-ui/core';
import { Field, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../../contexts/userContext';
import editUser from '../../utils/editUser';

function Settings({ setLoginVisible }) {
    let [user, setUser] = useContext(UserContext);
    let [nameError, setNameError] = useState("");
    let [emailError, setEmailError] = useState("");
    let [editedUser, setEditedUser] = useState(user);
    useEffect(() => {
        setEditedUser(user);
    }, [user]);
    function saveUserDetails() {
        let name = editedUser.user.name;
        let email = editedUser.user.email;
        let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid Email format!");
        } else {
            setEmailError("");
        }
        if (name.length < 3 || name.length > 30) {
            setNameError("Name must have at least 3 charecters and at most 32 charecters long!");
        } else {
            setNameError("");
        }
        if (nameError === "" && emailError === "") {
            editUser({ name: name, email: email, accessToken: user.accessToken });
        }
    }
    function saveUserPassword() {
        alert("This feature is not currently available! Contact admin to do the task.");
    }
    return (
        <div className="settings-container">
            {
                user.user &&
                <Box className="settings">
                    <h1>Settings</h1>
                    <Box boxShadow="3" className="input-group">
                        <h3 className="settings-input-summary">User details</h3>
                        <div className="settings-input-container">
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                                className="settings-textfield"
                                name="name"
                                error={nameError}
                                helperText={nameError}
                                value={editedUser.user ? editedUser.user.name || '' : editedUser}
                                onChange={(e) => setEditedUser({
                                    ...editedUser.accessToken,
                                    user: {
                                        ...editedUser.user,
                                        name: e.target.value
                                    }
                                })}
                            >
                            </TextField>
                        </div>
                        <div className="settings-input-container">
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                className="settings-textfield"
                                autoComplete='off'
                                name="email"
                                value={editedUser.user ? editedUser.user.email : ''}
                                error={emailError}
                                helperText={emailError}
                                onChange={(e) => setEditedUser({
                                    ...editedUser.accessToken,
                                    user: {
                                        ...editedUser.user,
                                        email: e.target.value
                                    }
                                })}
                            >
                            </TextField>
                        </div>
                        <Button
                            className="save-button"
                            type="submit"
                            onClick={saveUserDetails}
                        >
                            Save
                </Button>
                    </Box>
                    <Box boxShadow="3" className="input-group">
                        <h3 className="settings-input-summary">Password Settings</h3>
                        <div className="settings-input-container">
                            <TextField
                                label="Old Password"
                                variant="outlined"
                                type="password"
                                className="settings-textfield"
                                autoComplete='off'
                                onChange={(e) => setEditedUser({
                                    ...editedUser.accessToken,
                                    user: {
                                        ...editedUser.user,
                                        oldPassword: e.target.value
                                    }
                                })}
                            ></TextField>
                        </div>
                        <div className="settings-input-container">
                            <TextField
                                label="New password"
                                variant="outlined"
                                className="settings-textfield"
                                autoComplete='off'
                                onChange={(e) => setEditedUser({
                                    ...editedUser.accessToken,
                                    user: {
                                        ...editedUser.user,
                                        newPassword: e.target.value
                                    }
                                })}
                            ></TextField>
                        </div>
                        <div className="settings-input-container">
                            <TextField
                                label="Confirm new password"
                                variant="outlined"
                                className="settings-textfield"
                                autoComplete='off'
                                onChange={(e) => setEditedUser({
                                    ...editedUser.accessToken,
                                    user: {
                                        ...editedUser.user,
                                        confirmPassword: e.target.value
                                    }
                                })}
                            ></TextField>
                        </div>
                        <Button className="save-button" onClick={() => saveUserPassword()}>Save</Button>
                    </Box>
                    <Box boxShadow="3" className="input-group danger-zone">
                        <h3 className="settings-input-summary">Danger Zone</h3>
                        <div className="settings-input-container">
                            <TextField
                                label="Type your user name"
                                variant="outlined"
                                className="settings-textfield"
                                autoComplete='off'
                            ></TextField>
                        </div>
                        <div className="settings-input-container">
                            <TextField
                                label="Type your password"
                                variant="outlined"
                                className="settings-textfield"
                                autoComplete='off'
                                type="password"
                            ></TextField>
                        </div>
                        <Button variant="contained" color="secondary" onClick={() => alert("This feature is not currently available! Contact admin to do the task.")}>Delete</Button>
                    </Box>
                </Box>}
            {
                !user.user &&
                <h1>Login first to see this page</h1>
            }
            {
                !user.user && setLoginVisible(true)
            }
            {
                user.user && setLoginVisible(false)
            }
        </div>
    );
}

export default Settings;