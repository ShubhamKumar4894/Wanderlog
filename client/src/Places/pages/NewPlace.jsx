import React, { useCallback } from "react";
import { Input } from "../../shared/components/FormElements/Input";
import "./Placeform.css";
import Button from "../../shared/components/FormElements/Button"
import {useForm} from "../hooks/FormHook"
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/Validators";

export const NewPlace = () => {
  const[formState,inputHandler]=useForm({
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    address:{
      value: "",
      isValid: false,
    }
  },false)
  

  const formSubmission=(event)=>{
    event.preventDefault();
    console.log(formState.inputs)
  }
  return (
    <form className="place-form" onSubmit={formSubmission}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title!"
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description!"
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE(5)]}
        errorText="Please enter a valid Address!"
      />
      <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
    </form>
  );
};
