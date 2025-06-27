import React, { useState, useContext } from "react";
import { Input } from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/Validators";
import { useForm } from "../../Places/hooks/FormHook";
import { AuthContext } from "../../shared/context/Auth-context";
import Card from "../../shared/components/UIelements/Card";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIelements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import "./Auth.css";
import { useHttpClient } from "../../Places/hooks/Http-hook";
export const Auth = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoadingState, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const formSubmission = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_BACKEND_URL+"/users/signin",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        login(responseData.userID, responseData.token);
        console.log(responseData);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          import.meta.env.VITE_BACKEND_URL+"/users/signup",
          "POST",
          formData
        );
        login(responseData.userId,responseData.token);
        console.log(responseData);
      } catch (error) {}
    }
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoadingState && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={formSubmission}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name!"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image"
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email!"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password!"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};
