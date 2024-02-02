import generateResponse from "app/utils/generateResponse"
import { NextApiRequest } from "next"
import { randomLayers } from "../../app/lib/avatara"
import { parseAvataraQuery } from "../../app/utils/parseAvataraQuery"

const avatar = (req, res) => {
  const { sizes } = parseAvataraQuery(req.query)
  const layers = randomLayers()

  res.statusCode = 200
  if (sizes.length == 1) {
    // returns one image directly
    res.setHeader("Content-Type", "image/png")
    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "avatara" + ".png"
    )
  } else {
    // returns a zip with multiple images
    res.setHeader("Content-Type", "application/zip")
    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "avatara" + ".zip"
    )
    res.setHeader("Content-Encoding", "base64")
  }

  return res.send(generateResponse(layers, sizes))
}

export default avatar
