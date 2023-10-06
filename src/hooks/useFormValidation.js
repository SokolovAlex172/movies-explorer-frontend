import { useState, useCallback } from "react";

const useFormValidation = () => {
  const [inputValues, setInputValues] = useState({});
  const [errorText, setErrorText] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ ...inputValues, [name]: value });
    setErrorText({ ...errorText, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newInputValues = {}, newErrorText = {}, newIsValid = false) => {
      setInputValues(newInputValues);
      setErrorText(newErrorText);
      setIsValid(newIsValid);
    },
    [setInputValues, setErrorText, setIsValid]
  );

  return {
    isValid,
    handleChange,
    inputValues,
    errorText,
    resetForm
  };
}

export default useFormValidation;