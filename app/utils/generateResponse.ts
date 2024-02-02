import Avatara from "../../app/lib/avatara"
import applyLayers from "../../app/utils/applyLayers"
import JSZip from "jszip"
import { Layer, LayerNoId } from "app/types/avatara"
import saveAs from "file-saver"
import _name from "app/utils/defaults"

function render(avatar, browser = false) {
  return browser ? dataURLtoBlob(avatar.toDataURL()) : avatar.toBuffer()
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export default function generateResponse(
  layers: Layer[] | LayerNoId[],
  sizes: number[][],
  browser = false
) {
  if (sizes.length == 1) {
    const [width, height] = sizes[0]!
    const avatar = new Avatara(width, height)

    applyLayers(avatar, layers)
    return render(avatar, browser)
  } else {
    const zip = new JSZip()

    sizes.forEach(([width, height]) => {
      const avatar = new Avatara(width, height)
      applyLayers(avatar, layers)
      // const rendered = render(avatar, browser)
      zip.file(`${_name}/${width}x${height}` + ".png", render(avatar, browser))
    })

    return browser
      ? zip.generateAsync({ type: "blob" })
      : zip.generateNodeStream({ type: "nodebuffer", streamFiles: true })
  }
}
