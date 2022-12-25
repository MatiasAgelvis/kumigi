import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { z } from "zod"

const CreateSimpleDesign = z.object({
  id: z.string(),
  userId: z.number(),
  layers: z
    .object({
      id: z.string().nullish(),
      shape: z.string().nullish(),
      color: z.string(),
      text: z.string(),
      font: z.string(),
      display: z.boolean(),
    })
    .array(),
  heights: z.number().array(),
  widths: z.number().array(),
})

export default resolver.pipe(
  resolver.zod(CreateSimpleDesign),
  resolver.authorize(),
  async (input) => {
    const simpleDesign = await db.simpleDesigns.create({ data: input })

    return simpleDesign
  }
)
