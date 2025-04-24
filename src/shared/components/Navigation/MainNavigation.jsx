import React, { useState } from "react";
import { MainHeader } from "./MainHeader";
import { NavLinks } from "./NavLinks";
import { Link } from "react-router-dom";
import { SideDrawer } from "./SideDrawer";
import "./MainNavigation.css";
import { BackDrop } from "../UIelements/BackDrop";
export const MainNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpenState = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose=()=>{
    setIsDrawerOpen(false);
  }
  return (
    <>
      <BackDrop isOpen={isDrawerOpen} onClick={handleDrawerClose}/>
      {isDrawerOpen && (
        <SideDrawer isOpen={isDrawerOpen} onClick={handleDrawerClose}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button
          onClick={handleOpenState}
          className="main-navigation__menu-btn"
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};
