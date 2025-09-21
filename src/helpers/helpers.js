// src/helpers/helpers.js

/**
 * Truncate a string to a given length and add "..." if it’s too long.
 * @param {string} str - The input string
 * @param {number} length - Max allowed length
 * @returns {string} - Truncated string
 */
export function truncate(str, length) {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
