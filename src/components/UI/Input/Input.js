import React, { useReducer, useEffect, useContext } from "react";
import classes from "./Input.module.css";
import { FormContext } from "./index";

const initReducer = {
  value: "",
  isValid: false,
  message: "",
  color: "#EA5455",
};

const inputReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.isValid,
      message: action.message,
      color: action.color,
    };
  }
  return initReducer;
};

const Input = (props) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, initReducer);
  const formContext = useContext(FormContext);

  useEffect(() => {
    const findInputName = formContext.initialValues.find(
      (i) => i.name === props?.name
    );
    if (findInputName?.name) {
      formContext.setFormValues({
        name: props.name,
        value: inputState.value,
        isValid: inputState.isValid,
      });
    }
  }, [inputState]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    const { isValid, message, color } = props.validateCallback(value);
    setTimeout(() => {
      dispatchInput({ type: "USER_INPUT", value, message, isValid, color });
    }, 500);
    if (props.onChange && typeof props.onChange === "function") {
      props.onChange(value);
    }
  };

  const handleOnCheck = (e) => {
    const { checked } = e.target;
    const { isValid } = props.validateCallback(checked);
    dispatchInput({ type: "USER_INPUT", value: checked, isValid });
    if (props.onChange && typeof props.onChange === "function") {
      props.onChange(checked);
    }
  };

  return (
    <>
      {props.type === "checkbox" && (
        <div className={classes.input_checkbox}>
          <input type="checkbox" onChange={handleOnCheck} />
          <div className={classes.label}>{props.label}</div>
        </div>
      )}

      {props.type !== "checkbox" && (
        <div className={classes.input_field}>
          <span className={classes.inputLabel}>
            {props.label} <span className={classes.inputRequest}>*</span>
          </span>
          <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={handleOnChange}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
          />
          {inputState.message ? (
            <span
              className={classes.errorMessage}
              style={{
                color: inputState.color,
              }}
            >
              {inputState.message}
            </span>
          ) : undefined}
        </div>
      )}
    </>
  );
};

export default Input;
