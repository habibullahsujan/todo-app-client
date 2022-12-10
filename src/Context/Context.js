import React, { createContext } from 'react';

export const AuthContext=createContext([]);

const Context = ({children}) => {
    const authInfo={name:'sujan'}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Context;