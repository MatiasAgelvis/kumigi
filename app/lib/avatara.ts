import { createCanvas } from "canvas";
import Color from "color";
import {
  isNode, //isBrowser, isWebWorker, isJsDom, isDeno,
} from "browser-or-node";
import emoji from "node-emoji";
import shapes, { Layer, Shape } from "./shapes";

export const Fonts = Object.freeze({
  PLEX: "plex",
  COURIER: "courier",
  COUSINE: "cousine",
  PT: "pt",
  ROBOTO: "roboto",
  EMOJI: "emoji",
});

if (isNode) {
  import("canvas").then(({ registerFont }) => {
    registerFont("public/fonts/IBMPlexMono-Bold.ttf", {
      family: Fonts.PLEX,
    });
    registerFont("public/fonts/CourierPrime-Bold.ttf", {
      family: Fonts.COURIER,
    });
    registerFont("public/fonts/Cousine-Bold.ttf", {
      family: Fonts.COUSINE,
    });
    registerFont("public/fonts/PTMono-Regular.ttf", { family: Fonts.PT });
    registerFont("public/fonts/RobotoMono-Bold.ttf", {
      family: Fonts.ROBOTO,
    });
    registerFont("public/fonts/NotoEmoji-Bold.ttf", {
      family: Fonts.EMOJI,
    });
  });
}

const FONT_FACTOR = 0.35;

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export function Avatara(width = 200, height = 200) {
  this.canvas = createCanvas(width, height);
  this.ctx = this.canvas.getContext("2d");
}

Avatara.prototype.fonts = function () {
  return Object.values(Fonts);
};

Avatara.prototype.shapes = function () {
  return [...Object.keys(shapes), "text"];
};

Object.entries(shapes).map(([shape, func]) => {
  Avatara.prototype[shape] = function (layer: Layer) {
    func(this.canvas, this.ctx, layer);
  };
});

export function graphemeSplitter(str: string) {
  return Array.from(new Intl.Segmenter().segment(str)).map(
    (segment) => segment.segment
  );
}

export function textLength(str: string) {
  return graphemeSplitter(emoji.emojify(str)).length;
}

Avatara.prototype.text = async function ({
  color = "#fff",
  text = "",
  font = "plex",
}) {
  const fontName = getKeyByValue(Fonts, font.toLowerCase());
  const fontFactor = 3 * FONT_FACTOR * this.canvas.width;
  let str = graphemeSplitter(emoji.emojify(text)).slice(0, 3).join("");
  // .normalize();

  this.ctx.fillStyle = Color(color).rgb().string();

  this.ctx.font = `bold ${fontFactor / str.length}px ${Fonts[fontName]}, ${
    Fonts.EMOJI
  }`;
  this.ctx.textAlign = "center";
  this.ctx.textBaseline = "middle";
  this.ctx.fillText(str, this.canvas.width / 2, this.canvas.height / 2);

  return this;
};

Avatara.prototype.toHTML = function () {
  return `<img src=" ${this.canvas.toDataURL()} " />`;
};

Avatara.prototype.toDataURL = function () {
  return this.canvas.toDataURL();
};

Avatara.prototype.toBuffer = function () {
  return this.canvas.toBuffer();
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

export function randomLayer(): Layer {
  const shape = choose(Object.keys(shapes));
  return {
    shape: shape,
    color: randomColor(),
    text: randomText(),
    font: choose(Fonts),
  };
}

export function randomLayers(min = 1, max = 5): Array<Layer> {
  let numLayers = Math.ceil(Math.random() * max) + min;
  return Array.from(Array(numLayers)).map((_) => randomLayer());
}

Avatara.prototype.randomAvatar = function () {
  let layers = randomLayers();
  layers.forEach((layer) => {
    this[layer.shape](layer);
  });
  return this;
};

export default Avatara;
