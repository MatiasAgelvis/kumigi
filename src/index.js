const express = require("express");
const { createCanvas, registerFont } = require("canvas");
const compression = require('compression');
const helmet = require('helmet');

registerFont("fonts/IBMPlexMono-Bold.ttf", { family: "plex" });
registerFont("fonts/CourierPrime-Bold.ttf", { family: "courier" });
registerFont("fonts/Cousine-Bold.ttf", { family: "cousine" });
registerFont("fonts/PTMono-Regular.ttf", { family: "pt" });
registerFont("fonts/RobotoMono-Bold.ttf", { family: "roboto" });

const fonts = {
    plex: 0.35,
    courier: 0.36,
    cousine: 0.35,
    pt: 0.35,
    roboto: 0.35,
};

const app = express();

app.use(compression());
app.use(helmet());

app.get("/", (req, res) => {
    res.json({
        paths: ["basic",'rectangle','circle','gradient'],
        colors: ['back', 'fore', 'textColor'],
        text: ['string'],
        fonts: Object.keys(fonts)
    });
});

function seed(req, res, next) {
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext("2d");
    res.locals.canvas = canvas;
    res.locals.ctx = ctx;

    return next();
}

function background(req, res, next) {
    const { ctx, canvas } = res.locals;
    const { back = "000" } = req.query;

    ctx.fillStyle = `#${back}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return next();
}

function foreground(req, res, next) {
    const { ctx, canvas } = res.locals;
    return next();
}

function rectangle(req, res, next) {
    const { ctx, canvas } = res.locals;
    const { fore = "555" } = req.query;

    ctx.fillStyle = `#${fore}`;
    ctx.fillRect(0, 0.2 * canvas.height, canvas.width, 0.6 * canvas.height);
    return next();
}

function circle(req, res, next) {
    const { ctx, canvas } = res.locals;
    const { fore = "555" } = req.query;

    ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.45,
        0,
        2 * Math.PI
    );

    ctx.fillStyle = `#${fore}`;
    ctx.fill();
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = '#003300';
    // ctx.stroke();

    return next();
}

function gradient(req, res, next) {
    const { ctx, canvas } = res.locals;

    const { back = "000", fore = "444" } = req.query;

    // Create a linear gradient
    // The start gradient point is at x=20, y=0
    // The end gradient point is at x=220, y=0
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    // Add three color stops
    gradient.addColorStop(0, `#${back}`);
    gradient.addColorStop(1, `#${fore}`);

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return next();
}

function text(req, res, next) {
    const { ctx, canvas } = res.locals;
    const { text = "", textColor = "fff", font = "Plex" } = req.query;

    ctx.fillStyle = `#${textColor}`;
    ctx.font = `bold ${fonts[font] * canvas.width}px ${font.toLowerCase()}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text.slice(0,3), canvas.width / 2, canvas.height / 2);

    return next();
}

function toHTML(res) {
    const { ctx, canvas } = res.locals;
    return '<img src="' + canvas.toDataURL() + '" />';
}

app.get("/basic", seed, background, text, (req, res) => {
    return res.send(toHTML(res));
});

app.get("/rectangle", seed, background, rectangle, text, (req, res) => {
    return res.send(toHTML(res));
});

app.get("/circle", seed, background, circle, text, (req, res) => {
    return res.send(toHTML(res));
});

app.get("/gradient", seed, background, gradient, text, (req, res) => {
    return res.send(toHTML(res));
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
