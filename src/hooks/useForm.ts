import { FormEvent } from "react";

export function useForm<FormDataType>() {

  const handleSubmit = (onSubmit: (data: FormDataType) => void) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries())

    onSubmit(values as FormDataType)
  }

  return { handleSubmit }
}