const express = require("express");
const { createCanvas, registerFont } = require("canvas");
const compression = require("compression");
const helmet = require("helmet");
const Avatara = require("../lib/avarata");

const app = express();

app.use(compression());
app.use(helmet());

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/", (req, res) => {
    res.json({
        paths: ["basic", "rectangle", "circle", "gradient"],
        colors: ["back", "fore", "textColor"],
        text: ["string"],
        fonts: new Avatara().fonts(),
    });
});

function circular(X, i) {
    return X[i % X.length];
}

function parseToArrayOfStrings(arrayString){
    return arrayString.replace(/\[|\]/g,'').split(',')
}

app.get("/compose/*", (req, res) => {
    // first two are '' and 'compose'
    const shapes = req.path.split("/").slice(2);

    const {
        height = 200,
        width = 200,
        colors: colorsString = "[#000]",
        text = "",
        textColor = "#fff",
        font = "Plex",
    } = req.query;

    // make array of colors form query
    const colors = parseToArrayOfStrings(colorsString);

    let avatar = new Avatara(width, height);

    shapes.forEach((shape, i) => {
        avatar[shape](circular(colors, i));
    });

    return res.send(avatar.toHTML());
});

app.get("/:shape", (req, res) => {
    const {
        height = 200,
        width = 200,
        back = "#000",
        fore = "#999",
        text = "",
        textColor = "#fff",
        font = "Plex",
    } = req.query;

    let avatar = new Avatara(width, height);

    return res.send(
        avatar
            .background(back)
            [req.params.shape](fore)
            .text(text, textColor, font)
            .toHTML()
    );
});

app.listen(process.env.PORT || 3000, () => {
    console.log("\n\n\n");
    console.log("──────────────────────────");
    console.log(" ┌───────────────────────┐");
    console.log(" │---------START---------│");
    console.log(" └───────────────────────┘");
    console.log("──────────────────────────");
    console.log("\n");
});
