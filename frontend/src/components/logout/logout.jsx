import { Button, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import handleLogout from '../../utils/handleLogout';

const theme = createMuiTheme({palette: {primary: red, secondary: green}});

function Logout({ errors, setErrors, setLogoutVisible }) {
    let [user, setUser] = useContext(UserContext);
    function hideLogout(e) {
        let cX = e.clientX;
        let cY = e.clientY;
        let el = document.elementFromPoint(cX, cY);
        if(el.className === "logout") {
            el.classList.toggle("invisible");
            setTimeout(() => setLogoutVisible(false), 500);
        }
    }
    function hideLogoutB() {
        document.querySelector('.logout').classList.toggle("invisible");
        setTimeout(() => setLogoutVisible(false), 500);
    }
    return (
        <div className="logout" onClick={e => hideLogout(e)}>
            <div className="logout-container">
                <p>Are you sure want to log out?</p>
                <MuiThemeProvider theme={theme}>
                    <Button className="logoutModal-btn" color="primary" variant="contained" onClick={() => handleLogout(user, setUser, hideLogoutB, setErrors, errors)}>
                    Yes
                    </Button>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                    <Button className="logoutModal-btn" color="secondary" variant="contained" onClick={hideLogoutB}>
                    No
                    </Button>
                </MuiThemeProvider>
            </div>
        </div>
    );
}

export default Logout;