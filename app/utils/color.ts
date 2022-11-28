import Color from "color";
import colorString from "color-string";

export function canParseColor(x: string | Color) {
  try {
    Color(x);
  } catch (e) {
    return false;
  }

  return true;
}

export function rgba2hex(color: string) {
  return colorString.to.hex(colorString.get.rgb(color));
}

export function hex2rgba(color: string) {
  return colorString.to.rgb(colorString.get.rgb(color));
}
