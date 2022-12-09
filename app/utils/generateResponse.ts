import Avatara from "../../app/lib/avatara"
import applyLayers from "../../app/utils/applyLayers"
import JSZip from "jszip"
import { Layer, LayerNoId } from "app/types/avatara"

export default function generateResponse(
  layers: Layer[] | LayerNoId[],
  sizes: number[][]
) {
  if (sizes.length == 1) {
    const [width, height] = sizes[0]!
    const avatar = new Avatara(width, height)
    applyLayers(avatar, layers)

    return avatar.toBuffer()
  } else {
    const zip = new JSZip()

    sizes.forEach(([width, height]) => {
      const avatar = new Avatara(width, height)
      applyLayers(avatar, layers)
      // console.log(width, height)
      zip.file(`avatara/${width}x${height}` + ".png", avatar.toBuffer())
    })

    return zip.generateNodeStream({ type: "nodebuffer", streamFiles: true })
  }
}
