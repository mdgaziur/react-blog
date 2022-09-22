import React from 'react';
import { Field, Formik } from 'formik';
import { Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import registerHandler from '../../utils/registerHandler';
import { v4 } from 'uuid';

function Register({ setRegisterVisible }) {
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    function hideRegister(e) {
        let cX = e.clientX;
        let cY = e.clientY;
        let el = document.elementFromPoint(cX, cY);
        if(el.className === "Register") {
            el.classList.toggle("invisible");
            setTimeout(() => setRegisterVisible(false), 500);
        }
    }
    function hideRegisterB(e) {
        document.querySelector('.Register').classList.toggle("invisible");
        setTimeout(() => setRegisterVisible(false), 500);
    }
    return (
        <div className="Register" onClick={e => hideRegister(e)}>
            <div className="Register-form-container">
                <div className="form-top">
                    <h1>Register</h1>
                    <button className="close-Register-form" onClick={hideRegisterB}>
                        <div></div>
                        <div></div>
                    </button>
                </div>
                <Formik
                    initialValues={{ name:'', email: '', password: '', passwordconfirm: '' }}
                    validate={values => {
                        let errors = {};
                        if(!values.name) {
                            errors.name = 'Full name is required';
                        } else if(values.name.length < 4 || values.name.length > 32) {
                            errors.name = 'Full name must have not less than 4 and not more than 32 charecters';
                        }
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
                        if(!values.passwordconfirm) {
                            errors.passwordconfirm = 'Must confirm the password';
                        } else if(values.passwordconfirm !== values.password) {
                            errors.passwordconfirm = 'Passswords don\'t match!';
                        }
                        if(isEmpty(errors)) errors = undefined;
                        return errors;
                    }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validateOnMount={false}
                    validationSchema={false}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        setSubmitting(true);
                        async function submit() {
                            let res = await registerHandler(values.name, values.email, values.password, setRegisterVisible);
                            if(res.errors) {
                                let errors = {};
                                res.errors.map((val) => {
                                    errors[val.param] = val.msg;
                                });
                                setErrors(errors);
                            }
                            else {
                                alert("Registered successfully! Now login by entering your email and password");
                                hideRegisterB();
                            }
                        }
                        submit();
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
                                        errors.network !== "" && typeof errors.network !== "undefined" ?
                                        <span className="error">
                                            {errors.network}
                                        </span>
                                        : undefined
                                    }
                                </div>
                                <div className="form-inputs">
                                    <h2>User details</h2>
                                    <Field
                                        className="form-input"
                                        component={TextField}
                                        name="name"
                                        type="text"
                                        label="Full name"
                                    />
                                    <Field
                                        className="form-input"
                                        component={TextField}
                                        name="email"
                                        type="email"
                                        label="Email"
                                    />
                                    <br />
                                    <h2>Password</h2>
                                    <Field
                                        className="form-input"
                                        component={TextField}
                                        type="password"
                                        label="Password"
                                        name="password"
                                    />
                                    <Field
                                        className="form-input"
                                        component={TextField}
                                        type="password"
                                        label="Confirm password"
                                        name="passwordconfirm"
                                    />
                                </div>
                                <div className="form-bottom">
                                    <Button
                                    className="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    type="submit"
                                    >
                                    Register
                                    </Button>
                                </div>
                            </form>
                        )}
                </Formik>
            </div>
        </div>
    )
}

export default Register;