import { useState } from "react";

const useInput = (isValidFn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  const enteredInputValid = isValidFn(enteredValue);
  const isInputInvalid = !enteredInputValid && enteredValueTouched;

  const valueInputHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setEnteredValueTouched(true);
  };

  return {
    enteredValue,
    isInputInvalid,
    valueInputHandler,
    inputBlurHandler,
  };
};

export default useInput;
