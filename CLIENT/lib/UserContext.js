// lib/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Nueva línea

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      if (isTokenExpired(token)) {
        // Token expirado, cerrar sesión
        logout();
      } else {
        // Token válido, establecer usuario
        const decodedToken = jwt_decode(token);
        setUser(decodedToken);
      }
    }
    setLoading(false);  // Nueva línea
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('accessToken', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return true;
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}> {/* Modificada */}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);