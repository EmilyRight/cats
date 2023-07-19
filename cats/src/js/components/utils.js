/// Unique ID
/**
  * @param {number} dec
  * @return {string}
  */
function dec2hex(dec) {
  return (`0${dec.toString(16)}`).substring(-2);
}

/**
 * @param {number} len
 * @return {string}
 */
function generateId(len) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

export default generateId;
