/**
 * @function validStringLength
 *
 * @param {Object} userName
 * @param {Object} groupName
 *
 * @return { object } true if the parameter lenghts are greater than 1
 */
export const StringLength = (userName, groupName) => {
  if (userName.length >= 1 && groupName.length >= 1) {
    return true;
  }
  return null;
};

/**
 * @function validStringContent
 *
 * @param {Object} userName
 * @param {Object} groupName
 *
 * @return { object } true if the parameter is a character or a number
 */
export const StringContent = (userName, groupName) => {
  if (userName.match(/\W/) || groupName.match(/\W/)) {
    return false;
  }
  return true;
};


// module.exports = {
//   validStringLength,
//   validStringContent,
// };

// import { string, } from 'inputValidator'