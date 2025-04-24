import React from "react";
import { UserItems } from "./UserItems.jsx";
export const UserLists = ({items}) => {
  if (items.length === 0) {
    return (
      <div className="flex text-3xl font-bold justify-center">
        <h2>No Users found...</h2>
      </div>
    );
  }
  return (
    <ul className="list-none mx-0 my-auto p-0 w-[90%] max-w-[50rem] flex justify-center flex-wrap">
      {items.map((user) => (
        <UserItems
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};
