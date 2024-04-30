import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

  const [pollingData, setPollingData]=useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const modifyPollingData = (data)=>{
      setPollingData(data)
    }

    const currentUserHandler = (user)=>{
      setCurrentUser(user)
    }


  return (
    <AuthContext.Provider
      value={{
        pollingData,
        currentUser,
        modifyPollingData,
        currentUserHandler
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
