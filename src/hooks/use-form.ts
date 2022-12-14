import { useState } from 'react';

interface IFormValues {
  [key: string]: string
}

export interface IUseFormResult {
  values: IFormValues,
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<IFormValues>>
}

export const useForm = (inputValues: { [key: string]: string }): IUseFormResult => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}