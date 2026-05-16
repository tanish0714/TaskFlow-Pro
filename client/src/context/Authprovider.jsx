import React, { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function Authprovider({ children }) {
  const [AuthUser, setAuthUser] = useState(undefined)

  useEffect(() => {
    const storedUser = localStorage.getItem("ChatApp")
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <AuthContext.Provider value={[AuthUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
