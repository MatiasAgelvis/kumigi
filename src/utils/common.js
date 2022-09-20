import hexColorRegex from "hex-color-regex";

export function queue(arr, item) {
  arr.push(item);
  return arr.shift();
}

export function parseArrayString(arrayString, callback = (x) => x) {
  return (
    arrayString
      // remove brackets
      .replace(/\[|\]/g, "")
      // replace , not inside parenthesis with |
      .replace(/,(?![^(]*\))/g, "|")
      // split by |
      .split("|")
      // ensure that all characters are lowercase
      .map(callback)
  );
}

export function testHexColor(color) {
  return hexColorRegex().test("#" + color);
}
