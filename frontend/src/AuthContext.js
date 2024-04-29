import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext({}); // Initialized as an empty object, not null

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user'); // Assume you store user data in localStorage
        if (userData) {
          const user = JSON.parse(userData);
          if (user.access_token) {
            setIsLoggedIn(true);
          }
        }
      }, []);

    const login = (token) => {
        localStorage.setItem('user', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
