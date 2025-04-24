import React from "react";

export const BackDrop = ({ isOpen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-screen h-screen fixed top-0 left-0 bg-stone-900 z-10 transition-opacity duration-400 
        ${isOpen ? "opacity-80 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    ></div>
  );
};
