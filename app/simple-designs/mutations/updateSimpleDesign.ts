import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateSimpleDesign = z.object({
  name: z.string(),
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
  resolver.zod(UpdateSimpleDesign),
  resolver.authorize(),
  async ({ name, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const simpleDesign = await db.simpleDesigns.update({
      where: { name },
      data,
    })

    return simpleDesign
  }
)
