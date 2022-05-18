import { Router } from "express";
import Avatara from "../lib/avatara.js";
import {
  circular,
  parseArrayString,
  applyLayers,
  testHexColor,
} from "./common.js";
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

  shapes.forEach((shape, i) => {
    if (shape !== "text") {
      avatar[shape](circular(colors, i));
    } else {
      avatar[shape](texts.shift(), circular(colors, i), fonts.shift());
    }
  });

  return res.send(avatar.toHTML());
});

export default router;
