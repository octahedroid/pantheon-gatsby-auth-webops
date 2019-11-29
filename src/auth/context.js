import React, { useState } from "react";
import {
  handleDrupalLogin,
  isLoggedIn,
  handleDrupalLogout,
  fetchUserInfo,
  fetchPrivateContent,
  updateUserProfile,
  getRefreshToken
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
          const resp = await handleDrupalLogin(username, password, "gatsby");
          
          if (resp.access_token) {
            setToken(resp);
            const user = await fetchUserInfo(resp);
            setUser(user.data);
            return user;
          }
          return resp
        },
        isLoggedIn: async () => {
          const token = await isLoggedIn();
          if (token) {
            setToken(token);
            const user = await fetchUserInfo(token);
            setUser(user.data);
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
          setUser(user.data);
        },
        fetchPrivateContent,
        updateUserProfile: async (token, userId, payload) => {
          const user = await updateUserProfile(token, userId, payload)
          const newToken = await getRefreshToken(token, '')
          setToken(newToken);
          setUser(user.data);
          return user.data
        }
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;
