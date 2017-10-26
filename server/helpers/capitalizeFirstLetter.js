/**
 * @function capitalizeFirstLetter
 *
 * @return { object } a string in lowercase and the First letter in Capital
 *
 * @param { String } character
 */
const capitalizeFirstLetter = (character) => {
  const string = character.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default capitalizeFirstLetter;
