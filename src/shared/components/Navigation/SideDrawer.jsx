import React from "react";
import ReactDOM from "react-dom";
//import "./SideDrawer.css";

export const SideDrawer = ({ isOpen, children,...props }) => {
  return ReactDOM.createPortal(
    <aside
      {...props}
      className={`fixed left-0 top-0 z-[100] h-screen w-[70%] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.26)] transform transition-transform duration-200 ease-in-out 
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {children}
    </aside>,
    document.querySelector("#drawer-hook")
  );
};
