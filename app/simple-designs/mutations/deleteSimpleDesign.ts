import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteSimpleDesign = z.object({
  id: z.string(),
});

export default resolver.pipe(
  resolver.zod(DeleteSimpleDesign),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const simpleDesign = await db.simpleDesigns.deleteMany({ where: { id } });

    return simpleDesign;
  }
);
