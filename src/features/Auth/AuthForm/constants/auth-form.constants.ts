export const signInFormSchema = {
  email: {
    validation: ['email'],
  },
  password: {
    validation: ['isRequired', 'isLengthRequired'],
  },
};

export const signInFormDefaultValues = {
  email: '',
  password: '',
};
