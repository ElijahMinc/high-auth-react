import { useState } from 'react';

export const useErrors = () => {
  const [errors, setErrors] = useState({});

  return {
    errors,
    setErrors,
  };
};
