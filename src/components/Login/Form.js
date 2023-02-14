import React, { useState, useContext, useEffect } from "react";
import classes from "./Login.module.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { FormContext } from "../../components/UI/Input";

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const SigninFormComponent = (props) => {
  const [formValid, setFormValid] = useState(false);
  const formContext = useContext(FormContext);
  useEffect(() => {
    if (formContext.initialValues) {
      const length = formContext.initialValues.length;
      let count = 0;
      formContext.initialValues.forEach((i) => {
        if (i.isValid) {
          count++;
        }
      });
      if (length === count) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  }, [formContext]);

  const handleValidateEmail = (value = "") => {
    if (!value) {
      return {
        isValid: false,
        message: "Email is required",
      };
    } else if (value && !validateEmail(value)) {
      return {
        isValid: false,
        message: "Email is not valid",
      };
    }
    return {
      isValid: true,
      message: "",
    };
  };

  const handleValidatePassword = (value = "") => {
    if (!value) {
      return {
        isValid: false,
        message: "Password is required",
      };
    }
    return {
      isValid: true,
      message: "",
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit(formContext.initialValues);
    return;
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        id="email"
        name="email"
        type="text"
        label="E-mail"
        placeholder="johndoe@gmail.com"
        validateCallback={handleValidateEmail}
      />
      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        validateCallback={handleValidatePassword}
      />
      <Button type="submit" disabled={!formValid}>
        <span className={classes.buttonLabel}>Sign Up</span>
      </Button>
    </form>
  );
};

export { SigninFormComponent };
