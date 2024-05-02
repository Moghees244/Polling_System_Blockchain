import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

  const [token, setToken] = useState(null)
  const [pollingData, setPollingData]=useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const modifyPollingData = (data)=>{
      setPollingData(data)
    }

    const currentUserHandler = (user)=>{
      setCurrentUser(user)
    }

    const tokenHandler = (token)=>{
      setToken(token)
    }


  return (
    <AuthContext.Provider
      value={{
        pollingData,
        currentUser,
        token,
        modifyPollingData,
        currentUserHandler,
        tokenHandler
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
