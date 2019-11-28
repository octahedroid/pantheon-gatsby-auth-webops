import React, { useState } from "react";
import {
  handleDrupalLogin,
  isLoggedIn,
  handleDrupalLogout,
  fetchUserInfo,
  fetchPrivateContent
} from "./api";

export const Auth = React.createContext(null);
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(false);

  return (
    <Auth.Provider
      value={{
        user,
        token,
        handleLogin: async (username, password) => {
          const token = await handleDrupalLogin(username, password, "gatsby");
          if (token) {
            setToken(token);
            const user = await fetchUserInfo(token);
            setUser(user);
          }
          return user;
        },
        isLoggedIn: async () => {
          const token = await isLoggedIn();
          if (token) {
            setToken(token);
            const user = await fetchUserInfo(token);
            setUser(user);
          }
          return token;
        },
        handleLogout: () => {
          handleDrupalLogout();
          setUser(false);
          setToken(false);
        },
        fetchUserData: async () => {
          const token = await isLoggedIn();
          const user = await fetchUserInfo(token);
          setUser(user);
        },
        fetchPrivateContent
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;
