const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailValidation = (value) => {
  if (email_regex.test(value)) {
    return true;
  }

  return false;
};

export const keyEmpty = (obj) => {
  return Object.keys(obj).every((key) => {
    return obj[key] || obj[key] === 0 ? true : false;
  });
};
