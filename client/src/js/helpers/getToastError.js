import toastr from 'toastr';

/**
 * @function ToastrError
 *
 * @return { object } error message
 *
 * @param { * } error
 */
const getToastError = (error) => {
  const message = error.response.data.message;
  toastr.error(message);
};

export default getToastError;
