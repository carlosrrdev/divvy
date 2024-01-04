/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The string to capitalize the first letter.
 * @returns {string} The string with the first letter capitalized.
 */
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isMdScreen() {
  // Check if viewport is at least 768px in width, return true if so
  return window.innerWidth >= 768;
}