import React from "react";
import { Outlet } from "react-router-dom";
import { MainNavigation } from "./shared/components/Navigation/MainNavigation";
import { AuthContextProvider } from "./shared/context/Auth-context";
const RootLayout = () => {
  return (
    <AuthContextProvider>
      <MainNavigation />
      <main className="mt-20">
        <Outlet />
      </main>
    </AuthContextProvider>
  );
};

export default RootLayout;
