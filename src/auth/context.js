import React from "react";

export const AuthContext = React.createContext(null);

export const authContextState = {
  token: null,
  user: null,
  handleLogin: () => {},
  updateAuthenticatedUserState: () => {},
  fetchPrivateContent: (contentId) => {}
};

