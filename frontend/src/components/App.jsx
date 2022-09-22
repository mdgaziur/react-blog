import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import { User } from '../contexts/userContext';

import Body from './body/body';
import Footer from './footer/footer';
import Header from './header/Header';
import Login from './loginModal/login';
import Register from './registerModal/register';
import Logout from './logout/logout';
import { v4 } from 'uuid';

function App() {
    let [loginVisible, setLoginVisible] = useState(false);
    let [registerVisible, setRegisterVisible] = useState(false);
    let [logoutVisible, setLogoutVisible] = useState(false);
    let [errors, setErrors] = useState([]);

    function closeError(key) {
        let currenterror = document.getElementById(key);
        console.log(key);
        currenterror.classList.toggle('error-closed');
        setTimeout(() => {
            setErrors(errors.filter((err) => {
                return err.key !== key
            }));
        }, 500);
    }

    console.log('%cHello Hacker!', 'color: white;background: red;font-family:\'Inter\';font-size:5rem;font-weight:bolder;letter-spacing: -1rem;');
    return (
        <User>
            <Router>
                <div className='App'>
                    {
                        loginVisible && <Login setLoginVisible={setLoginVisible} />
                    }
                    {
                        registerVisible && <Register setRegisterVisible={setRegisterVisible} />
                    }
                    {
                        logoutVisible && <Logout errors={errors} setErrors={setErrors} setLogoutVisible={setLogoutVisible}></Logout>
                    }
                    <div className="errors">
                        {
                            errors.map(val => (
                                <div className="error" id={val.key} key={val.key}>
                                    <span className="error-text">{val.msg}</span>
                                    <button className="close-error" onClick={() => closeError(val.key)}>&times;</button>
                                </div>
                            ))
                        }
                    </div>
                    <Header loginVisible={loginVisible} setLoginVisible={setLoginVisible} registerVisible={registerVisible} setRegisterVisible={setRegisterVisible} logoutVisible={logoutVisible} setLogoutVisible={setLogoutVisible} />
                    <Switch>
                        <Body setLoginVisible={setLoginVisible} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        </User>
    );
}

export default App;