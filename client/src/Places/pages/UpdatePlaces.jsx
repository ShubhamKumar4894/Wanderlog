import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import { useForm } from "../hooks/FormHook";
import { useHttpClient } from "../hooks/Http-hook";
import { AuthContext } from "../../shared/context/Auth-context";
import Card from "../../shared/components/UIelements/Card";
import "./Placeform.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/Validators";
import LoadingSpinner from "../../shared/components/UIelements/LoadingSpinner";

export const UpdatePlaces = () => {
  const ctxValue = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoadingState, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setloadedPlace] = useState();
  const placeId = useParams().placeId;
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/places/${placeId}`
        );
        setloadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlace();
  }, [sendRequest, placeId]);
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

  if (isLoadingState) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not locate the place</h2>
        </Card>
      </div>
    );
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/${placeId}`,
        `PATCH`,
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          Authorization: "Bearer " + ctxValue.token,
          "Content-Type": "application/json",
        }
      );
      navigate(`/${ctxValue.userId}/places`);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoadingState && loadedPlace && (
        <form className="place-form" onSubmit={handleFormSubmit}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH]}
            errorText="Please enter a valid Description min 5 characters"
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};
