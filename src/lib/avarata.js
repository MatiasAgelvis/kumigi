const { createCanvas, registerFont } = require("canvas");
const Color = require("color");

const Fonts = Object.freeze({
    PLEX: "plex",
    COURIER: "courier",
    COUSINE: "cousine",
    PT: "pt",
    ROBOTO: "roboto",
});

registerFont("./fonts/IBMPlexMono-Bold.ttf", { family: Fonts.PLEX });
registerFont("./fonts/CourierPrime-Bold.ttf", { family: Fonts.COURIER });
registerFont("./fonts/Cousine-Bold.ttf", { family: Fonts.COUSINE });
registerFont("./fonts/PTMono-Regular.ttf", { family: Fonts.PT });
registerFont("./fonts/RobotoMono-Bold.ttf", { family: Fonts.ROBOTO });

const fontFactos = {};
fontFactos[Fonts.PLEX] = 0.35;
fontFactos[Fonts.COURIER] = 0.36;
fontFactos[Fonts.COUSINE] = 0.35;
fontFactos[Fonts.PT] = 0.35;
fontFactos[Fonts.ROBOTO] = 0.35;

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}

function Avatara(width = 200, height = 200) {
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext("2d");
}

Avatara.prototype.fonts = function () {
    return Object.values(Fonts);
};

Avatara.prototype.background = function (color = "#000") {
    this.ctx.fillStyle = Color(color).rgb().string();
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
};

Avatara.prototype.basic = function () {
    return this;
};

Avatara.prototype.rectangle = function (color = "#000") {
    this.ctx.fillStyle = Color(color).rgb().string();
    this.ctx.fillRect(
        0,
        0.2 * this.canvas.height,
        this.canvas.width,
        0.6 * this.canvas.height
    );
    return this;
};

Avatara.prototype.square = function (color = "#000") {
    this.ctx.fillStyle = Color(color).rgb().string();
    this.ctx.fillRect(
        0.13 * this.canvas.width,
        0.13 * this.canvas.height,
        0.76 * this.canvas.width,
        0.76 * this.canvas.height
    );
    return this;
};

Avatara.prototype.circle = function (color = "#777") {
    this.ctx.arc(
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.canvas.height * 0.45,
        0,
        2 * Math.PI
    );

    this.ctx.fillStyle = Color(color).rgb().string();
    this.ctx.fill();
    return this;
};

Avatara.prototype.gradient = function (color = "#00f") {
    // Create a linear gradient
    var gradient = this.ctx.createLinearGradient(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

    // Add three color stops
    gradient.addColorStop(0, Color(color).alpha(0).rgb().string());
    gradient.addColorStop(1, Color(color).rgb().string());

    // Set the fill style and draw a rectangle
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
};

Avatara.prototype.text = function (text = "", color = "#fff", font = "Plex") {
    let fontName = getKeyByValue(Fonts, font.toLowerCase());
    let fontFacor = fontFactos[Fonts[fontName]] * this.canvas.width;

    this.ctx.fillStyle = Color(color).rgb().string();
    this.ctx.font = `bold ${fontFacor}px ${Fonts[fontName]}`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
        text.slice(0, 3),
        this.canvas.width / 2,
        this.canvas.height / 2
    );
    return this;
};

Avatara.prototype.toHTML = function () {
    return `<img src=" ${this.canvas.toDataURL()} " />`;
};

module.exports = Avatara;
