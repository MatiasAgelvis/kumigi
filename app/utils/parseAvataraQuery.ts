import { randomLayer } from "app/lib/avatara"
import {
  ApiQuery,
  AvataraQuery,
  Layer,
  LayerNoId,
  Shape,
} from "app/types/avatara"
import Color from "color"
import { parseArrayString, testHexColor } from "../utils/common"
import { createLayer } from "./createLayer"

function passOrReplace<T>(
  value: T,
  test: (x: T) => boolean = Boolean,
  alternative: T
) {
  return test(value) ? value : alternative
}

function parseColor(colorString: string | undefined, dft: string) {
  if (!colorString) return dft
  // if the color has the format hex(123456) return the hashed value
  if (colorString.match(/hex\((.{0,6})\)/g)) {
    return "#" + colorString.matchAll(/hex\((.{0,6})\)/g)[0][1]
  }

  const append = testHexColor(colorString) ? "#" : ""
  return colorString ? Color(append + colorString).toString() : dft
}

function parseSizes(sizesString: string | undefined, dft: number): number[][] {
  // default return
  if (!sizesString) return [[dft, dft]]

  const splitted = parseArrayString(sizesString).map((size) => size.split("x"))

  const parsed = splitted.map((sizes) => sizes.map((size) => parseInt(size)))

  const passCondition = (x) => Boolean(x) && !isNaN(x)
  // duplicate single elements, all must be tuples, discard extra values
  return parsed.map((size) =>
    (size.length == 1 ? [size[0], size[0]] : [size[0], size[1]]).map(
      // replace undefineds and NaNs with dft
      (untested) => passOrReplace(untested, passCondition, dft)
    )
  )
}

function parseLayer(layerString: string, dft: LayerNoId): LayerNoId {
  const parsed = parseArrayString(layerString)

  if (!parsed || !parsed[0]) return dft

  return {
    shape: (parsed[0] || "empty") as Shape,
    color: parseColor(parsed[1], "#000"),
    font: parsed[2] || "pt",
    text: parsed.slice(3).join(",") || "",
    display: true,
  }
}

export function parseAvataraQuery(query: ApiQuery & AvataraQuery): {
  sizes: number[][]
  layers: Layer[] | LayerNoId[]
} {
  // parse the height and width
  const sizes = parseSizes(query.sizes, 400)

  const layersString = query.shapes || ["empty,transparent"]

  const layers: LayerNoId[] = layersString.map((layerAsString) =>
    parseLayer(layerAsString, createLayer())
  )

  return { sizes, layers }
}
