import React, { useState, useContext, useEffect } from "react";
import classes from "./Signup.module.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { FormContext } from "../UI/Input";

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const FormComponent = (props) => {
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

  const handleValidateFirstName = (value = "") => {
    if (!value) {
      return {
        isValid: false,
        message: "Firstname is required",
      };
    }
    return {
      isValid: true,
      message: "",
    };
  };

  const handleValidateLastName = (value = "") => {
    if (!value) {
      return {
        isValid: false,
        message: "Lastname is required",
      };
    }
    return {
      isValid: true,
      message: "",
    };
  };

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
    } else if (value && value.length < 4) {
      return {
        isValid: false,
        message: "Password is weak",
      };
    } else if (value && value.length < 7) {
      return {
        isValid: false,
        message: "Password is fair",
        color: "#E3A063",
      };
    } else if (
      value &&
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/.test(
        value
      )
    ) {
      if (value && 6 < value.length && value.length < 9) {
        return {
          isValid: true,
          message: "Password is good",
          color: "#647FFF",
        };
      } else if (value && 9 < value.length) {
        return {
          isValid: true,
          message: "Password is strong",
          color: "#59BC87",
        };
      }
    } else if (
      value &&
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/.test(
        value
      )
    ) {
      return {
        isValid: false,
        message:
          "Password must contain at least one digit, one special character, and one letter.",
      };
    }
    return {
      isValid: true,
      message: "",
    };
  };

  const handleCheckbox = (value = false) => {
    if (!value) {
      return {
        isValid: false,
      };
    }
    return {
      isValid: true,
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
        name="firstName"
        type="text"
        label="Firstname"
        placeholder="johndoe"
        validateCallback={handleValidateFirstName}
      />
      <Input
        name="lastName"
        type="text"
        label="Lastname"
        placeholder="johndoe"
        validateCallback={handleValidateLastName}
      />
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
        placeholder="⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉"
        validateCallback={handleValidatePassword}
      />
      <Input
        type="checkbox"
        name="checkbox"
        label={
          <div>
            <span className={classes.checkboxLabel}>i agree to</span>
            <a className={classes.checkboxLink}>privacy policy & terms</a>
          </div>
        }
        validateCallback={handleCheckbox}
      />
      <Button type="submit" disabled={!formValid}>
        <span className={classes.buttonLabel}>Sign Up</span>
      </Button>
    </form>
  );
};

export { FormComponent };
