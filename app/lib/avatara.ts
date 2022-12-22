import { createCanvas } from "canvas"
import GraphemeBreaker from "grapheme-breaker-mjs"
import Color from "color"
import {
  isNode, //isBrowser, isWebWorker, isJsDom, isDeno,
} from "browser-or-node"
import shapes from "./shapes"
import { Layer, Shape } from "app/types/avatara"
import { idCard } from "app/utils/createLayer"

export const Fonts = Object.freeze({
  PLEX: "plex",
  COURIER: "courier",
  COUSINE: "cousine",
  PT: "pt",
  ROBOTO: "roboto",
  NOTO: "noto",
  FASOLID: "Solid Icons",
  BRANDS: "Brand Icons",
  FAREGULAR: "Regular Icons",
})

if (isNode) {
  import("canvas").then(({ registerFont }) => {
    registerFont("public/fonts/IBMPlexMono-Bold.ttf", {
      family: Fonts.PLEX,
    })
    registerFont("public/fonts/CourierPrime-Bold.ttf", {
      family: Fonts.COURIER,
    })
    registerFont("public/fonts/Cousine-Bold.ttf", {
      family: Fonts.COUSINE,
    })
    registerFont("public/fonts/PTMono-Regular.ttf", { family: Fonts.PT })
    registerFont("public/fonts/RobotoMono-Bold.ttf", {
      family: Fonts.ROBOTO,
    })
    registerFont("public/fonts/NotoEmoji-Bold.ttf", {
      family: Fonts.NOTO,
    })
    registerFont("public/fonts/fa-solid-900.ttf", {
      family: Fonts.FASOLID,
    })
    registerFont("public/fonts/fa-brands-400.ttf", {
      family: Fonts.BRANDS,
    })
    registerFont("public/fonts/fa-regular-400.ttf", {
      family: Fonts.FAREGULAR,
    })
  })
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}

export function Avatara(width = 200, height = 200) {
  this.canvas = createCanvas(width, height)
  this.ctx = this.canvas.getContext("2d")
}

Avatara.prototype.fonts = function () {
  return Object.values(Fonts)
}

Avatara.prototype.shapes = function () {
  return [...Object.keys(shapes), "text"]
}

Object.entries(shapes).map(([shape, func]) => {
  Avatara.prototype[shape] = function (layer: Layer) {
    func(this.canvas, this.ctx, layer)
  }
})

export function graphemeSplitter(str: string) {
  return GraphemeBreaker.break(str)
}

export function parseText(str: string) {
  return str.replace(/:([a-zA-Z0-9_\-\+]+):/g, (match) =>
    // remove colons -> parse hex int -> convert code to char
    String.fromCharCode(parseInt(match.replace(/:/g, ""), 16))
  )
}

export function textLength(str: string) {
  return graphemeSplitter(parseText(str)).length
}

function textAreaOnCanvas(ctx, str) {
  return {
    width: ctx.measureText(str).width,
    height:
      ctx.measureText(str).actualBoundingBoxAscent +
      ctx.measureText(str).actualBoundingBoxDescent,
  }
}

Avatara.prototype.text = async function ({
  color = "#fff",
  text = "",
  font = "pt",
}) {
  if (text == "") return this

  const fontName = getKeyByValue(Fonts, font.toLowerCase()) || "pt"
  let str = parseText(text)

  let fontSize = 1

  this.ctx.textAlign = "center"
  this.ctx.textBaseline = "middle"
  this.ctx.fillStyle = Color(color).rgb().string()

  let prevWidth = 0
  while (
    textAreaOnCanvas(this.ctx, str).width < 0.7 * this.canvas.width &&
    textAreaOnCanvas(this.ctx, str).height < 0.7 * this.canvas.height &&
    textAreaOnCanvas(this.ctx, str).width != prevWidth
  ) {
    prevWidth = textAreaOnCanvas(this.ctx, str).width
    this.ctx.font = `bold ${fontSize}px ${Fonts[fontName]}, ${Fonts.FASOLID}, ${Fonts.BRANDS}, ${Fonts.FAREGULAR}`
    fontSize = fontSize + 2
  }

  this.ctx.fillText(str, this.canvas.width / 2, this.canvas.height / 2)
  return this
}

Avatara.prototype.toHTML = function () {
  return `<img src=" ${this.canvas.toDataURL()} " />`
}

Avatara.prototype.toDataURL = function () {
  return this.canvas.toDataURL()
}

Avatara.prototype.toBuffer = function () {
  return this.canvas.toBuffer()
}

function choose(choices: Array<any> | string) {
  const index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

function randomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function randomText() {
  const size = Math.round(Math.random() * 2) + 1
  let letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.@#$%^&*(){}[]|/"
  var text = ""
  for (var i = 0; i < size; i++) {
    text += choose(letters)
  }
  return text
}

export function randomLayer(): Layer {
  const shape: Shape = choose([...Object.keys(shapes), "text"])

  return idCard({
    shape,
    color: randomColor(),
    text: shape == "text" ? randomText() : "",
    font: shape == "text" ? choose(Object.values(Fonts)) : "",
    display: true,
  })
}

export function randomLayers(min = 1, max = 5): Array<Layer> {
  let numLayers = Math.ceil(Math.random() * max) + min
  return Array.from(Array(numLayers)).map((_) => randomLayer())
}

Avatara.prototype.randomAvatar = function () {
  let layers = randomLayers()
  layers.forEach((layer) => {
    this[layer.shape!](layer)
  })
  return this
}

export default Avatara
