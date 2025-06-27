import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth-context";

export const NavLinks = () => {
  const { isLoggedIn, logout,userId,loadingState} = useContext(AuthContext);
  
console.log("userid from context:", userId);
console.log("isLoggedIn:", isLoggedIn);

  return (
    <ul className="nav-links">
      <NavLink to="/" end>
        <li>ALL USERS</li>
      </NavLink>
      {isLoggedIn &&  (
        <NavLink to={`/${userId}/places`}>
          <li>MY PLACES</li>
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to="/places/new">
          <li>ADD PLACES</li>
        </NavLink>
      )}
      {!isLoggedIn && (
        <NavLink to="/auth">
          <li>AUTHENTICATE</li>
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink onClick={() => logout()} to="/">
          <li>LOGOUT</li>
        </NavLink>
      )}
    </ul>
  );
};
