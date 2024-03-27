"use client"
import { createContext, useState } from "react"

export const UserDetailContext = createContext()


export const UserDetailProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({});
    return (
        <UserDetailContext.Provider

            value={{
                userDetails,
                setUserDetails
            }}
        >
            {children}
        </UserDetailContext.Provider>
    )
}