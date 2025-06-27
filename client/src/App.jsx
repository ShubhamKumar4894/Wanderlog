import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./shared/context/Auth-context";
import { Users } from "./users/pages/Users";

export const App = () => {
  const { loadingState } = useContext(AuthContext);

 
  return <Users />;
};
