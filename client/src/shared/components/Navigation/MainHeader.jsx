import React from "react";

export const MainHeader = (props) => {
  return (
    <header
      className="w-full h-[4rem] flex md:justify-between items-center fixed top-0 left-0 bg-red-400
    shadow-md px-4 py-[1rem] z-5"
    >
      {props.children}
    </header>
  );
};
