import { Router } from "express";
import Avatara from "../lib/avatara.js";
import applyLayers from "../utils/applyLayers.js";
import { circular, parseArrayString, testHexColor } from "./common.js";
var router = Router();

router.use((req, res) => {
  const shapes = req.path.split("/").slice(1);

  const {
    height: heightString = 200,
    width: widthString = 200,
    colors: colorsString = "[000]",
    texts: textString = "",
    fonts: fontsString = "plex",
  } = req.query;

  // parse the height and width
  const height = parseInt(heightString);
  const width = parseInt(widthString);

  // make array of colors form query
  const colors = parseArrayString(
    colorsString,
    (x) => (testHexColor(x) ? "#" : "") + x.toLowerCase()
  );
  const texts = parseArrayString(textString);
  let fonts = parseArrayString(fontsString, (x) => x.toLowerCase());

  // if only one font is given it will be reused for all texts
  if (fonts.length == 1) {
    fonts = texts.map(() => fonts[0]);
  }

  const avatar = new Avatara(width, height);
  const layers = {};

  shapes.forEach((shape, i) => {
    layers[i] = { shape: shape, color: circular(colors, i) };

    if (shape == "text") {
      layers[i] = { ...layers[i], text: texts.shift(), font: fonts.shift() };
    }
  });

  applyLayers(avatar, layers);

  return res.send(avatar.toHTML());
});

export default router;
