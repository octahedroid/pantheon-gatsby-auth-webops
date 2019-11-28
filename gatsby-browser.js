
import React from "react"
import AuthContextProvider from "./src/auth/context"

export const wrapRootElement = ({ element }) =>
<AuthContextProvider>{element}</AuthContextProvider>