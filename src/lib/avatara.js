import Canvas from "canvas";
import Color from "color";
import {
  isNode, //isBrowser, isWebWorker, isJsDom, isDeno,
} from "browser-or-node";
import GraphemeSplitter from "grapheme-splitter";

const { createCanvas, registerFont } = Canvas;

const Fonts = Object.freeze({
  PLEX: "plex",
  COURIER: "courier",
  COUSINE: "cousine",
  PT: "pt",
  ROBOTO: "roboto",
});

const Shapes = Object.freeze([
  "background",
  "square",
  "circle",
  "rectangle",
  "triangle",
  "diamond",
  "squircle",
  "linear",
  "radial",
  "text",
]);

if (isNode) {
  registerFont("./public/fonts/IBMPlexMono-Bold.ttf", { family: Fonts.PLEX });
  registerFont("./public/fonts/CourierPrime-Bold.ttf", {
    family: Fonts.COURIER,
  });
  registerFont("./public/fonts/Cousine-Bold.ttf", { family: Fonts.COUSINE });
  registerFont("./public/fonts/PTMono-Regular.ttf", { family: Fonts.PT });
  registerFont("./public/fonts/RobotoMono-Bold.ttf", {
    family: Fonts.ROBOTO,
  });
}

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

Avatara.prototype.shapes = function () {
  return Shapes;
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
  const margin = 0.13;
  this.ctx.fillStyle = Color(color).rgb().string();
  this.ctx.fillRect(
    margin * this.canvas.width,
    margin * this.canvas.height,
    (1 - 2 * margin) * this.canvas.width,
    (1 - 2 * margin) * this.canvas.height
  );
  return this;
};

Avatara.prototype.squircle = function (color = "#000") {
  const segments = 128;

  const PI = Math.PI,
    TAU = PI * 2,
    n = 4,
    step = TAU / segments,
    dimx = this.canvas.width / 2,
    dimy = this.canvas.height / 2,
    r = 0.8,
    rx = dimx * r,
    ry = dimy * r;

  function coord(t) {
    let power = 2 / n;
    let c = Math.cos(t),
      x = Math.pow(Math.abs(c), power) * Math.sign(c);
    let s = Math.sin(t),
      y = Math.pow(Math.abs(s), power) * Math.sign(s);
    return { x, y };
  }

  function drawSegmentTo(t) {
    let c = coord(t);
    let cx = dimx + rx * c.x;
    let cy = dimy + ry * c.y;
    return { cx, cy };
  }

  this.ctx.beginPath();
  this.ctx.moveTo(dimx + rx, dimy);

  for (let t = step; t <= TAU; t += step) {
    let { cx, cy } = drawSegmentTo(t);
    this.ctx.lineTo(cx, cy);
  }

  this.ctx.moveTo(dimx + rx, dimy);
  this.ctx.closePath();

  this.ctx.fillStyle = Color(color).rgb().string();
  this.ctx.fill();

  return this;
};

Avatara.prototype.triangle = function (color = "#000") {
  this.ctx.fillStyle = Color(color).rgb().string();
  this.ctx.beginPath();
  this.ctx.moveTo(this.canvas.width / 2, 0);
  this.ctx.lineTo(0, this.canvas.height);
  this.ctx.lineTo(this.canvas.width, this.canvas.height);
  this.ctx.closePath();
  this.ctx.fill();
  return this;
};

Avatara.prototype.diamond = function (color = "#000") {
  this.ctx.fillStyle = Color(color).rgb().string();
  this.ctx.beginPath();
  this.ctx.moveTo(this.canvas.width / 2, 0);
  this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
  this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
  this.ctx.lineTo(0, this.canvas.height / 2);
  this.ctx.closePath();
  this.ctx.fill();
  return this;
};

Avatara.prototype.circle = function (color = "#777") {
  this.ctx.beginPath();
  this.ctx.ellipse(
    this.canvas.width / 2,
    this.canvas.height / 2,
    this.canvas.width * 0.45,
    this.canvas.height * 0.45,
    0,
    0,
    2 * Math.PI
  );
  this.ctx.closePath();
  this.ctx.fillStyle = Color(color).rgb().string();
  this.ctx.fill();
  return this;
};

Avatara.prototype.linear = function (color = "#00f") {
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

Avatara.prototype.radial = function (color = "#00f") {
  // Create a linear gradient
  var gradient = this.ctx.createRadialGradient(
    this.canvas.width / 2,
    this.canvas.height / 2,
    0,
    this.canvas.width / 2,
    this.canvas.height / 2,
    Math.min(this.canvas.width, this.canvas.height)
  );

  // Add three color stops
  gradient.addColorStop(0, Color(color).rgb().string());
  gradient.addColorStop(1, Color(color).alpha(0).rgb().string());

  // Set the fill style and draw a rectangle
  this.ctx.fillStyle = gradient;
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  return this;
};

Avatara.prototype.text = function (color = "#fff", text = "", font = "plex") {
  const splitter = new GraphemeSplitter();
  let fontName = getKeyByValue(Fonts, font.toLowerCase());
  let fontFactor = fontFactos[Fonts[fontName]] * this.canvas.width;

  this.ctx.fillStyle = Color(color).rgb().string();
  this.ctx.font = `bold ${fontFactor}px ${Fonts[fontName]}`;
  this.ctx.textAlign = "center";
  this.ctx.textBaseline = "middle";
  this.ctx.fillText(
    splitter.splitGraphemes(text).slice(0, 3).join(""),
    this.canvas.width / 2,
    this.canvas.height / 2
  );
  return this;
};

Avatara.prototype.toHTML = function () {
  return `<img src=" ${this.canvas.toDataURL()} " />`;
};

Avatara.prototype.toDataURL = function () {
  return this.canvas.toDataURL();
};

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function randomText() {
  const size = Math.round(Math.random() * 2) + 1;
  let letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.@#$%^&*(){}[]|/";
  var text = "";
  for (var i = 0; i < size; i++) {
    text += choose(letters);
  }
  return text;
}

function randomLayer() {
  const shape = choose(Shapes);
  const base = { shape: shape, color: randomColor() };
  return shape == "text"
    ? { ...base, text: randomText(), font: choose(Fonts) }
    : base;
}

Avatara.prototype.randomLayers = function () {
  let numLayers = Math.ceil(Math.random() * 5) + 1;
  return Array.from(Array(numLayers)).map((_) => randomLayer());
};

Avatara.prototype.randomAvatar = function () {
  let layers = this.randomLayers();
  layers.forEach((layer) => {
    if (layer.shape != "text") {
      this[layer.shape](layer.color);
    } else {
      this[layer.shape](layer.color, layer.text, layer.font);
    }
  });
  return this;
};

export default Avatara;
