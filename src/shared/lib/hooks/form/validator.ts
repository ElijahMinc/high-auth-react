// @ts-nocheck

import {
  checkEmailPattern,
  checkIsBool,
  checkIsLength,
  checkIsfilled,
  checkPassword,
  checkPhone,
} from './validation';

export const validator = {
  isRequired: {
    check: checkIsfilled,
    message: 'This field is required',
  },
  isLengthRequired: {
    check: checkIsLength,
    message: 'This field is required',
  },
  isRequiredChoice: {
    check: checkIsBool,
    message: 'Please make a choice',
  },
  // birthDate: {
  //   check: checkBirthDatePattern,
  //   message: 'Please enter valid Date of Birth',
  // },
  email: {
    check: checkEmailPattern,
    message: 'Email format is not valid',
  },
  phone: {
    check: checkPhone,
    message: 'Incorrect phone number',
  },
  password: {
    check: checkPassword,
    message: 'Weak password',
  },
};

export const validate = ({ schema, name, value, values }) => {
  let message = '';
  let customValidationPassed = false;

  const validation = schema[name].validation || [];
  const customValidation = schema[name].customValidation;
  const valuesToPresent = schema[name].valuesRequired;

  if (valuesToPresent) {
    const doValuesPresent = valuesToPresent.every((field) => {
      return !!(Object.keys(values).includes(field) && values[field]);
    });

    if (!doValuesPresent) return message;
  }

  if (customValidation) {
    if (Array.isArray(customValidation)) {
      customValidationPassed = customValidation.some((validation) => {
        if (validation.check(value, values)) {
          return false;
        } else {
          message = validation.message;

          return true;
        }
      });
    } else {
      if (!customValidation.check(value, values)) {
        message = customValidation.message;
      } else {
        customValidationPassed = true;
      }
    }
  } else {
    customValidationPassed = true;
  }

  customValidationPassed &&
    validation.forEach((validationName: any) => {
      if (!validator[validationName].check(value)) {
        message = validator[validationName].message;
      }
    });

  return message;
};

export function validateForm(values, schema) {
  const errors: any = {};

  Object.keys(schema).forEach((name) => {
    if (schema[name]) {
      const message = validate({
        schema,
        name,
        values,
        value: values[name],
      });

      if (!message) {
        return delete errors[name];
      }

      errors[name] = message;
    }
  });

  return errors;
}

export function validateInput({ name, value, values, errors, schema }) {
  return schema[name] ? validate({ schema, name, value, values }) : false;
}
