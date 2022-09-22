import React, { useContext, useEffect } from 'react';
import { Field, Formik } from 'formik';
import { Button } from '@material-ui/core';
import { TextField, Checkbox } from 'formik-material-ui';
import loginHandler from '../../utils/loginHandler';
import { UserContext } from '../../contexts/userContext';

function Login({ setLoginVisible }) {
    let [user, setUser] = useContext(UserContext);
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    function hideLogin(e) {
        let cX = e.clientX;
        let cY = e.clientY;
        let el = document.elementFromPoint(cX, cY);
        if(el.className === "login") {
            el.classList.toggle("invisible");
            setTimeout(() => setLoginVisible(false), 500);
        }
    }
    function hideLoginB(e) {
        document.querySelector('.login').classList.toggle("invisible");
        setTimeout(() => setLoginVisible(false), 500);
    }
    return (
        <div className="login" onClick={e => hideLogin(e)}>
            <div className="login-form-container">
                <div className="form-top">
                    <h1>Login</h1>
                    <button className="close-login-form" onClick={hideLoginB}>
                        <div></div>
                        <div></div>
                    </button>
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        let errors = {};
                        if (!values.email) {
                            errors.email = 'Email is required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        if(!values.password) {
                            errors.password = 'Password is required';
                        }
                        else if(values.password.length < 8) {
                            errors.password = 'Password must be at least 8 charecters long';
                        }
                        if(isEmpty(errors)) errors = undefined;
                        return errors;
                    }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validateOnMount={false}
                    validationSchema={false}
                    onSubmit={async (values, { setErrors, resetForm, setSubmitting }) => {
                        let res = await loginHandler(values.email, values.password);
                        if(res.errors) {
                            let errors = {}
                            for(let error of res.errors) {
                                if(error.field === "email") {
                                    errors['email'] = error.msg;
                                }
                                else if(error.field === "password") {
                                    errors['password'] = error.msg;
                                }
                                else if(error.field === "network") {
                                    errors['network'] = error.msg;
                                }
                            }
                            setErrors(errors);
                        } else {
                            //Set the user
                            setUser(res);
                            hideLoginB();
                        }
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="errors">
                                    {
                                        errors.email !== "" && typeof errors.email !== "undefined" ?
                                        <span className="error">
                                            {errors.email}
                                        </span>
                                        : undefined
                                    }
                                    {
                                        errors.password !== "" && typeof errors.password !== "undefined" ?
                                        <span className="error">
                                            {errors.password}
                                        </span>
                                        : undefined
                                    }
                                    {
                                        errors.network !== "" && typeof errors.network !== "undefined" ?
                                        <span className="error">
                                            {errors.network}
                                        </span>
                                        : undefined
                                    }
                                </div>
                                <div className="form-inputs">
                                    <Field
                                        className="form-input"
                                        component={TextField}
                                        name="email"
                                        type="email"
                                        label="Email"
                                    />
                                    <br />
                                    <Field
                                        className="form-input"
                                        component={TextField}
                                        type="password"
                                        label="Password"
                                        name="password"
                                    />
                                </div>
                                <div className="form-bottom">
                                    <Button
                                    className="submit"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                    >
                                    Login
                                    </Button>
                                </div>
                            </form>
                        )}
                </Formik>
            </div>
        </div>
    )
}

export default Login;