import toastr from 'toastr';

/**
 * @function ToastrError
 *
 * @param { error } error
 *
 * @return { object } returns the error message
 *
 */
export const getToastError = (error) => {
  const message = error.response.data.message;
  toastr.error(message);
};


/**
 * @function validateEmail
 *
 * @param { email } email to verify
 *
 * @return { boolean } returns the email if it is valid
 *
 */
export const validateEmail = (email) => {
  const emailExpression = (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return emailExpression.test(email);
};
