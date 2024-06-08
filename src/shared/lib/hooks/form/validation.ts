// @ts-nocheck

// import { isExists } from 'date-fns';

let prevAmountValue = '';

export const parseOnlyLetterAndSpace = (expression) =>
  expression.replace(/[^A-Za-z ]/g, '');

export const parseLength = (expression, length) =>
  expression.substring(0, length);

export const checkAtLeastLength = (expression, length) =>
  expression && expression.trim().length >= length;

export const parseOnlyNumbers = (expression) =>
  expression.replace(/[^0-9+]/g, '');

export const parseOnlyAmount = (expression) => {
  const pattern = /^\$?([0-9]{0,8})([.]\d{0,2})?$/;
  const matched = expression.match(pattern);
  if (matched) {
    if (matched[1][0] === '0' && matched[1][1] && matched[1][1] !== '.') {
      return prevAmountValue;
    }
    prevAmountValue = matched[1] + (matched[2] ? matched[2] : '');
    prevAmountValue =
      !matched[1] && matched[2] ? `0${prevAmountValue}` : prevAmountValue;
    return matched[0] ? prevAmountValue : '';
  } else {
    return prevAmountValue;
  }
};

export const checkIsfilled = (expression) => expression;

export const checkIsLength = (expression) => expression.length;

export const checkIsBool = (expression) =>
  expression === true || expression === false;

export const checkEmailPattern = (mail) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(mail);
};

export const parseOnlyLettersAndNumbers = (expression) =>
  expression.replace(/[^A-Za-z0-9`~!@#$%^&*()-_=+,<.>/?;:'"[{}+]/g, '');



export const checkPassword = (password) => {
  if (!password) return true;
  const isLong = password.length > 5;
  const hasBigLetters = /[A-Z]/g.test(password);
  const hasSmallLetters = /[a-z]/g.test(password);
  const hasNumbers = /[0-9]/g.test(password);

  return isLong && hasBigLetters && hasSmallLetters && hasNumbers;
};

export const checkPhone = (phone) =>
  phone ? phone.replace(/\D/g, '').length > 10 : true;

export const checkDonation = (amount) => (amount ? amount >= 1 : true);

// export const checkBirthDatePattern = (date) => {
//   if (!date) return true;

//   const dateArr = date.split('/');
//   const [month, day, year] = dateArr;
//   const currentYear = new Date(Date()).getFullYear();
//   const currentMonth = new Date(Date()).getMonth() + 1;
//   const currentDay = new Date(Date()).getDate();

//   if (year > currentYear || year < 1900) return false;
//   if (month > currentMonth && +year === currentYear) return false;
//   if (day > currentDay && +year === currentYear) return false;

//   return isExists(+year, +month - 1, +day);
// };

export const parseNoSpaces = (expression) => expression.trim();

export const checkQuantity = (quantity) =>
  !!Object.values(quantity).filter((item) => item).length;
