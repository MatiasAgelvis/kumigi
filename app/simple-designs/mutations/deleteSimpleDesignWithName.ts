import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteSimpleDesignWithName = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteSimpleDesignWithName),
  resolver.authorize(),
  async ({ name }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const simpleDesign = await db.simpleDesigns.deleteMany({ where: { name } })

    return simpleDesign
  }
)
