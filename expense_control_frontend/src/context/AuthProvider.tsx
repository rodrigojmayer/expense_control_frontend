/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react"

const AuthContext = createContext<object | any>(undefined)

type AuthProviderProps = {
    children: React.ReactNode
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState({})
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext