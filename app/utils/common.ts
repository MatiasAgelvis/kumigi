import hexColorRegex from "hex-color-regex";

export function queue<T>(arr: T[], item: T): T | undefined {
  arr.push(item);
  return arr.shift();
}

export function parseArrayString(
  arrayString: string,
  callback: (x: any, index?: number, array?: any[]) => any = (x) => x
) {
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

export function testHexColor(color: string) {
  return hexColorRegex().test("#" + color);
}
