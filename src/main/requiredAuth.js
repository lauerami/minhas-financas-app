import React from 'react'
import { useAuth } from "./provedorAutenticacao";
import { Navigate} from "react-router-dom"

export const RequireAuth = ({ children }) => {
    const auth = useAuth();
    
    if(!auth.isAutenticado) {
        return <Navigate to="/login" />
    }
    return children
    
}
