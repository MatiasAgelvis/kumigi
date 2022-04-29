const { createCanvas, registerFont } = require("canvas");

const Fonts = Object.freeze({
    PLEX: "plex",
    COURIER: "courier",
    COURSINE: "cousine",
    PT: "pt",
    ROBOTO: "roboto",
});

registerFont("fonts/IBMPlexMono-Bold.ttf", { family: Fonts.PLEX });
registerFont("fonts/CourierPrime-Bold.ttf", { family: Fonts.COURIER });
registerFont("fonts/Cousine-Bold.ttf", { family: Fonts.COURSINE });
registerFont("fonts/PTMono-Regular.ttf", { family: Fonts.PT });
registerFont("fonts/RobotoMono-Bold.ttf", { family: Fonts.ROBOTO });

const fontFactos = {};
fontFactos[Fonts.PLEX] = 0.35;
fontFactos[Fonts.COURIER] = 0.36;
fontFactos[Fonts.COURSINE] = 0.35;
fontFactos[Fonts.PT] = 0.35;
fontFactos[Fonts.ROBOTO] = 0.35;

function Avatara(width = 200, height = 200) {
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext("2d");
}

Avatara.prototype.fonts = function () {
    return Object.values(Fonts);
};

Avatara.prototype.background = function (color = "000") {
    this.ctx.fillStyle = `#${color}`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
};

Avatara.prototype.foreground = function () {
    // ¯\_(ツ)_/¯
};

Avatara.prototype.rectangle = function (color = "000") {
    this.ctx.fillStyle = `#${color}`;
    this.ctx.fillRect(
        0,
        0.2 * this.canvas.height,
        this.canvas.width,
        0.6 * this.canvas.height
    );
    return this;
};

Avatara.prototype.circle = function (color) {
    this.ctx.arc(
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.canvas.height * 0.45,
        0,
        2 * Math.PI
    );

    this.ctx.fillStyle = `#${color}`;
    this.ctx.fill();
    return this;
};

Avatara.prototype.gradient = function (back = "000", fore = "fff") {
    // Create a linear gradient
    var gradient = ctx.createLinearGradient(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

    // Add three color stops
    gradient.addColorStop(0, `#${back}`);
    gradient.addColorStop(1, `#${fore}`);

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
};

Avatara.prototype.text = function (text = "", color = "fff", font = "Plex") {
    let fontName = font.toUpperCase();

    this.ctx.fillStyle = `#${color}`;
    this.ctx.font = `bold ${
        fontFactos[Fonts[fontName]] * this.canvas.width
    }px ${Fonts[fontName]}`;
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
