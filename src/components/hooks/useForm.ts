// hooks/useForm.ts
import { useState } from "react";
import { validateName } from "../helpers/validateName";

export const useForm = (navigate:any) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submitForm = () => {
    const validationResult = validateName(name);
    if (validationResult.isValid) {
      localStorage.setItem("name", name);
      navigate("/chat", { state: { name } });
    } else {
      setError(validationResult.error);
    }
  };

  return { name, setName, submitForm, error, setError };
};
