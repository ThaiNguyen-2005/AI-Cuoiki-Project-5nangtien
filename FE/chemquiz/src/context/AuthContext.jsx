import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  token: null,
  role: null,
  setUser: () => {},
  setToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem('USER_ROLE'));
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const setToken = (newToken, userRole) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('ACCESS_TOKEN', newToken);
      localStorage.setItem('USER_ROLE', userRole);
      setRole(userRole);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('USER_ROLE');
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, role, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);