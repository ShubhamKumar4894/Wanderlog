import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../shared/components/FormElements/Input";
import "./Placeform.css";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useHttpClient } from "../hooks/Http-hook";
import { useForm } from "../hooks/FormHook";
import { AuthContext } from "../../shared/context/Auth-context";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIelements/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/Validators";
import { Auth } from "../../users/pages/Auth";

export const NewPlace = () => {
  const { isLoadingState, error, sendRequest, clearError } = useHttpClient();
  const ctxValue = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image:{
        value:null,
        isValid:false
      }
    },
    false
  );
  const navigate = useNavigate();
  const formSubmission = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      const responseData = await sendRequest(
        import.meta.env.VITE_BACKEND_URL + "/places/",
        "POST",
        formData,{
          Authorization: "Bearer " + ctxValue.token,
        }
      );
      navigate("/");
    } catch (error) {}
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={formSubmission}>
        {isLoadingState && <LoadingSpinner asOverlay />}
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
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please provide an image!"
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </>
  );
};
