import React, { createContext, useState } from 'react';

export const errorContext = createContext();

export const errorProvider = props => {
    const [errors, setErrors] = useState([]);
    return (
        <errorContext.Provider value={[errors, setErrors]}>
            {props.children}
        </errorContext.Provider>
    );
}