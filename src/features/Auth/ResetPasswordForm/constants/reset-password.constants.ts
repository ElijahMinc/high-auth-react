export const resetPasswordFormSchema = {
  newPassword: {
    validation: ['password', 'isRequired'],
  },
  confirmPassword: {
    validation: ['password', 'isRequired'],
    customValidation: {
      check: (value: string, values: any) => {
        return value === values['newPassword'];
      },
      message: 'Is not matches',
    },
  },
};

export const resetPasswordFormDefaultValues = {
  newPassword: '',
  confirmPassword: '',
};
