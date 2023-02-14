import { createContext, useState } from "react";

const FormContext = createContext({
  initialValues: [],
  setFormValues: Function,
});

const FormProvider = ({ children, initialValues }) => {
  const [formValues, setFormValues] = useState(initialValues || []);

  const handleOnSetFormValues = ({
    name = "",
    value = "",
    isValid = false,
  }) => {
    setFormValues((prev) =>
      prev.map((i) =>
        i.name === name
          ? {
              ...i,
              value,
              isValid,
            }
          : i
      )
    );
  };

  return (
    <FormContext.Provider
      value={{
        initialValues: formValues,
        setFormValues: handleOnSetFormValues,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
