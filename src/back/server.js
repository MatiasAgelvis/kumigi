const express = require("express");
const { createCanvas, registerFont } = require("canvas");
const compression = require("compression");
const helmet = require("helmet");
const Avatara = require("../lib/avatara");

const app = express();

app.use(compression());
app.use(helmet());

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/", (req, res) => {
    res.json({
        shapes: ["basic", "rectangle", "circle", "gradient"],
        colors: ["back", "fore", "textColor"],
        text: ["string"],
        fonts: new Avatara().fonts(),
    });
});

function circular(X, i) {
    return X[i % X.length];
}

function parseArrayOfColors(arrayString) {
    return (
        arrayString
            // remove brackets
            .replace(/\[|\]/g, "")
            // replace , not inside parenthesis with |
            .replace(/,(?![^(]*\))/g, "|")
            // split by |
            .split("|")
            // ensure that all characters are lowercase
            .map((x) => x.toLowerCase())
    );
}

app.get("/*", (req, res) => {
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
    const colors = parseArrayOfColors(colorsString);

    let avatar = new Avatara(width, height);

    shapes.forEach((shape, i) => {
        if (shape != "text") {
            avatar[shape](circular(colors, i));
        } else {
            avatar[shape](text, color, font);
        }
    });

    return res.send(avatar.toHTML());
});

app.listen(process.env.PORT || 3000, () => {
    console.log("\n\n\n");
    console.log("───────────────────────────");
    console.log(" ┌───────────────────────┐ ");
    console.log(" │---------START---------│ ");
    console.log(" └───────────────────────┘ ");
    console.log("───────────────────────────");
    console.log("\n");
});
