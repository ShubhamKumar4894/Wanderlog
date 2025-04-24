import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../../shared/components/FormElements/Input";
import indiaGate from "../../assets/IndiaGate.png";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../hooks/FormHook";
import Card from "../../shared/components/UIelements/Card";
import "./Placeform.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/Validators";

const DUMMY_PLACES = [
  {
    id: "U1",
    title: "India Gate",
    description: "This is just another dummy place description",
    imageURL: indiaGate,
    address: "Kartavya Path, India Gate, New Delhi, Delhi 110001",
    location: {
      lat: 28.612912,
      lng: 77.2269348,
    },
    creator: "u1",
  },
  {
    id: "U2",
    title: "Random Place two ",
    description: "This is just second dummy place description",
    imageURL: indiaGate,
    address: "Kartavya Path, India Gate, New Delhi, Delhi 110001",
    location: {
      lat: 28.612912,
      lng: 77.2269348,
    },
    creator: "u2",
  },
];

export const UpdatePlaces = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  if (identifiedPlace) {
    useEffect(() => {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
      setIsLoading(false);
    }, [identifiedPlace, setFormData]);
  }

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not locate the place</h2>
        </Card>
      </div>
    );
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading....</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={handleFormSubmit}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH]}
        errorText="Please enter a valid Description min 5 characters"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};
