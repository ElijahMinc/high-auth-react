// @ts-nocheck

import { useState } from 'react';
import { useErrors } from './useErrors';
import { validateForm, validateInput } from './validator';

export const useForm = ({ callback, schema = {}, initialValues = {} }) => {
  const [values, setValues] = useState(initialValues);
  const { errors, setErrors } = useErrors();

  const validateOnSubmit = () => {
    const formErrors = validateForm(values, schema);
    setErrors(formErrors);
    const hasErrors = Object.keys(formErrors).length !== 0;

    return hasErrors;
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    const hasErrors = validateOnSubmit();

    if (!hasErrors) {
      return callback(values, hasErrors);
    }
  };

  const handleInputError = (name, error, oldErrors) => {
    let newErrors = { ...oldErrors };

    if (error) {
      newErrors = { ...oldErrors, [name]: error };
    } else {
      delete newErrors[name];
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { target } = event;

    let newValue = null;
    const name = target ? target.name : event.name;
    const currentSchema = schema[name];
    delete errors[name];

    if (!target) {
      newValue = event.value;
    } else {
      event.persist();
      const { value, checked, type } = target;

      if (type === 'checkbox') {
        newValue = checked;
      } else {
        if (currentSchema && currentSchema.parse) {
          newValue = currentSchema.parse(value);
        } else {
          newValue = value;
        }
      }
    }

    const newValues = { ...values, [name]: newValue };

    setValues(newValues);
  };

  const handleBlur = (event) => {
    const { target } = event;

    const name = target ? target.name : event.name;

    const inputValidationProps = {
      name,
      value: values[name],
      values,
      errors,
      schema,
    };

    const newError = validateInput(inputValidationProps);
    const newErrors = handleInputError(name, newError, errors);

    setErrors(newErrors);
  };

  const setCustomValue = (name, value) => {
    setErrors((errors) => ({ ...errors, [name]: null }));
    setValues((values) => ({ ...values, [name]: value }));
  };

  const clearValues = (toInitial) => {
    setValues(toInitial ? initialValues : {});
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    setCustomValue,
    values,
    errors,
    setErrors,
    clearValues,
    setValues,
    validateOnSubmit,
  };
};
