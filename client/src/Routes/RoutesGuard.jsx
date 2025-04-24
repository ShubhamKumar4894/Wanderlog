import { Navigate, Outlet } from "react-router-dom";
import { Auth } from "../users/pages/Auth";
import { AuthContext } from "../shared/context/Auth-context";
import { useContext } from "react";

export const ProtectedRoute=()=>{
    const {isLoggedIn}=useContext(AuthContext);
    return isLoggedIn?<Outlet/>:<Navigate to="/auth" replace/>
}
export const AuthOnlyRoute=()=>{
    const {isLoggedIn}=useContext(AuthContext);
    return !isLoggedIn?<Auth/>:<Navigate to="/" replace/>
}