

import React, { createContext, useReducer, useContext } from 'react';



//Create the context
const defaultValue = {}
const UserEmailContext = createContext(defaultValue);

// Create the reducer function
export const userEmailReducer = (state, action) => {
    'use client'
    switch (action.type) {
        case 'SET_EMAIL':
            return { email: action.payload };
        default:
            return state;
    }
};

// Create the context provider component
export const UserEmailProvider = ({ children }) => {
    'use client'
    const [state, dispatch] = useReducer(userEmailReducer, { email: null });

    return (      
        <UserEmailContext.Provider value={{ state, dispatch }}>
            { children }
        </UserEmailContext.Provider>
    );
};

// Custom hook to access the context
export const useUserEmail = () => {
    'use client'
    const context = useContext(UserEmailContext);
    if (context === undefined) {
        throw new Error('useUserEmail must be used within a UserEmailProvider');
    }
    return context;
};