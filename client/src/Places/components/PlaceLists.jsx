import React from "react";
import "./PlaceList.css";
import Card from "../../shared/components/UIelements/Card";
import { PlaceItem } from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
export const PlaceLists = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place._id}
          id={place._id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          createrId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};
