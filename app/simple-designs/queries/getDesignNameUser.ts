import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetSimpleDesign = z.object({
  // This accepts type of undefined, but is required at runtime
  name: z.string(),
  userId: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetSimpleDesign),
  resolver.authorize(),
  async ({ name, userId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const simpleDesign = await db.simpleDesigns.findFirst({
      where: { name, userId },
    })

    if (!simpleDesign) throw new NotFoundError()

    return simpleDesign
  }
)
