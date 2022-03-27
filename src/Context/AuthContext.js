import { createContext } from "react";
import useAuth from "./useAuth";

export const AuthContext=createContext({})

export const AuthProvider=({children})=>{
    const {auth,setAuth}=useAuth()
    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}    
        </AuthContext.Provider>
    )
}

export default AuthContext