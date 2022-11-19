import {
  ApiQuery,
  AvataraQuery,
  Layer,
  LayerNoId,
  Shape,
} from "app/types/avatara";
import { parseArrayString, testHexColor } from "../utils/common";
import { makeLayers } from "./makeLayers";

export function parseAvataraQuery(
  query: ApiQuery & AvataraQuery
): [number, number, Layer[] | LayerNoId[]] {
  const {
    height: heightString = "200",
    width: widthString = "200",
    colors: colorsString = "[000]",
    texts: textString = "",
    fonts: fontsString = "plex",
    shapes,
  } = query;

  // parse the height and width
  const height = parseInt(heightString);
  const width = parseInt(widthString);

  // make array of colors form query
  const colors = parseArrayString(
    colorsString,
    (x) => (testHexColor(x) ? "#" : "") + x.toLowerCase()
  );

  const texts = parseArrayString(textString);
  const fonts = parseArrayString(fontsString, (x) => x.toLowerCase());

  // if only one font is given it will be reused for all texts
  const layers: LayerNoId[] = makeLayers(shapes!, colors, texts, fonts);

  return [height, width, layers];
}
