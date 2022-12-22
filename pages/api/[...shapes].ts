import { parseAvataraQuery } from "../../app/utils/parseAvataraQuery"
import { NextApiRequest } from "next"
import { BlitzNextApiResponse } from "@blitzjs/next"
import generateResponse from "app/utils/generateResponse"

const avatar = (req: NextApiRequest, res: BlitzNextApiResponse) => {
  const { sizes, layers } = parseAvataraQuery(req.query)

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
