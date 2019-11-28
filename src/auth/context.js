import React, {useState} from "react";
import { handleDrupalLogin, isLoggedIn, handleDrupalLogout, fetchUserInfo  } from "./api";

export const Auth = React.createContext(null);
const AuthContext = ({children}) => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(false);
  
  return (
    <Auth.Provider value={{
      user,
      token,
      handleLogin: async (username, password) => {
        const token = await handleDrupalLogin(username, password, "gatsby");
        if(token){
          setToken(token)
          const user = await fetchUserInfo(token)
          setUser(user.data[0])
        }
        return token
      },
      isLoggedIn: async () =>{
        const token = await isLoggedIn()
        if(token){
          setToken(token)
          const user = await fetchUserInfo(token)
          setUser(user.data[0])
        }
        return token
      },
      handleLogout: () => {
        handleDrupalLogout()
        setUser(false)
        setToken(false)
      },
      fetchUserData: async () => {
        const token = await isLoggedIn()
        const user = await fetchUserInfo(token)
        setUser(user.data[0])
      },
      fetchPrivateContent: contentId => {},
    }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;