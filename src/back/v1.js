import { Router } from "express";
import Avatara from "../lib/avatara.js";
import { circular, parseArrayString } from "./common.js";
var router = Router();

router.use((req, res) => {
    const shapes = req.path.split("/").slice(1);

    const {
        height: heightString = 200,
        width: widthString = 200,
        colors: colorsString = "[#000]",
        text = "",
        textColor = "#fff",
        font = "Plex",
    } = req.query;

    const height = parseInt(heightString);
    const width = parseInt(widthString);
    
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

export default router;
