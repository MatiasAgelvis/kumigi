const express = require("express");
const { createCanvas, registerFont } = require("canvas");
const compression = require("compression");
const helmet = require("helmet");
const Avatara = require("../lib/avarata");

const app = express();

app.use(compression());
app.use(helmet());
app.use(constructor);

function constructor(req, res, next) {
    const { height = 200, width = 200 } = req.query;
    res.locals.avatar = new Avatara(width, height);
    return next();
}

app.get("/", constructor, (req, res) => {
    const { avatar } = res.locals;

    res.json({
        paths: ["basic", "rectangle", "circle", "gradient"],
        colors: ["back", "fore", "textColor"],
        text: ["string"],
        fonts: avatar.fonts(),
    });
});

app.get("/basic", constructor, (req, res) => {
    const { avatar } = res.locals;

    const {
        back = "000",
        text = "",
        textColor = "fff",
        font = "Plex",
    } = req.query;

    return res.send(
        avatar.background(back).text(text, textColor, font).toHTML()
    );
});

app.get("/rectangle", constructor, (req, res) => {
    const { avatar } = res.locals;

    const {
        back = "000",
        fore = "555",
        text = "",
        textColor = "fff",
        font = "Plex",
    } = req.query;

    return res.send(
        avatar
            .background(back)
            .rectangle(fore)
            .text(text, textColor, font)
            .toHTML()
    );
});

app.get("/circle", constructor, (req, res) => {
    const { avatar } = res.locals;

    const {
        back = "000",
        fore = "555",
        text = "",
        textColor = "fff",
        font = "Plex",
    } = req.query;

    return res.send(
        avatar
            .background(back)
            .circle(fore)
            .text(text, textColor, font)
            .toHTML()
    );
});

app.get("/gradient", constructor, (req, res) => {
    const { avatar } = res.locals;

    const {
        back = "000",
        fore = "555",
        text = "",
        textColor = "fff",
        font = "Plex",
    } = req.query;

    return res.send(
        avatar
            .background(back)
            .gradient(back, fore)
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
