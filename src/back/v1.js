const express = require("express");
const Avatara = require("../lib/avatara");
const { circular, parseArrayString } = require("./common");
var router = express.Router();

router.use((req, res) => {
    const shapes = req.path.split("/").slice(1);

    const {
        height = 200,
        width = 200,
        colors: colorsString = "[#000]",
        text = "",
        textColor = "#fff",
        font = "Plex",
    } = req.query;

    // make array of colors form query
    const colors = parseArrayString(colorsString, (x) => x.toLowerCase());

    let avatar = new Avatara(width, height);

    shapes.forEach((shape, i) => {
        avatar[shape](circular(colors, i));
    });

    // Text will always be on top
    if (text) {
        avatar[shape](text, textColor, font);
    }

    return res.send(avatar.toHTML());
});

module.exports = router;