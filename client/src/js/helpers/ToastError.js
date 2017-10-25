import toastr from 'toastr';

/**
 * @function ToastrError
 *
 * @return { object } error message
 *
 * @param { * } error
 */
const ToastError = (error) => {
  const message = error.response.data.message;
  toastr.error(message);
};

export default ToastError;
