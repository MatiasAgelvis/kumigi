import { Layer, OKey } from "app/types/avatara";
import urlJoin from "url-join";

function extractProps(array: any[], prop: OKey): any[] {
  return array.map((x) => x[prop]);
}

function urlParam(name: string, value: string | string[] | number) {
  const isArray = Array.isArray(value);
  return value
    ? `&${name}=${isArray ? "[" : ""}${value}${isArray ? "]" : ""}`
    : "";
}

export default function URLfromLayers(
  BASE: string,
  layers: Layer[],
  parameters: { name: string; value: string | number }[] = []
) {
  const shapes = extractProps(layers, "shape").filter((x) => x);
  const colors = extractProps(layers, "color")
    .filter((x) => x)
    .map((color) => color.replace("#", ""))
    .toString();
  const texts = extractProps(layers, "text")
    .filter((x) => x)
    .toString();
  const fonts = extractProps(layers, "font")
    .filter((x) => x)
    .toString();

  const params =
    urlParam("colors", colors) +
    urlParam("texts", texts) +
    urlParam("fonts", fonts) +
    parameters.map((x) => urlParam(x.name, x.value)).join("");

  const URL = (
    urlJoin(BASE, ...shapes) + (shapes.length > 0 ? "?" + params : "")
  ).replace(/ /g, "");

  return URL;
}
