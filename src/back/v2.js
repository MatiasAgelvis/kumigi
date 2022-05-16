const express = require("express");
const Avatara = require("../lib/avatara");
var router = express.Router();
const { circular, parseArrayString, applyLayers } = require('./common')

router.use((req, res) => {
    const shapes = req.path.split("/").slice(1);

    const {
        height = 200,
        width = 200,
        colors: colorsString = "[#000]",
        texts: textString  = "",
        fonts: fontsString = "plex",
    } = req.query;

    // make array of colors form query
    const colors = parseArrayString(colorsString, (x) => x.toLowerCase());
    const texts = parseArrayString(textString);
    let fonts = parseArrayString(fontsString, (x) => x.toLowerCase());

    // if only one font is given it will be reused for all texts
    if (fonts.length == 1){
      fonts = texts.map(() => fonts[0])
    }

    let avatar = new Avatara(width, height);

    shapes.forEach((shape, i) => {
      if (shape !== 'text') {
        avatar[shape](circular(colors, i));
      }
      else{
        avatar[shape](texts.shift(), circular(colors, i), fonts.shift());
      }
    });

    return res.send(avatar.toHTML());
});

module.exports = router;
