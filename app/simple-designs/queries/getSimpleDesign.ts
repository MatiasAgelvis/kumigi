import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetSimpleDesign = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(
  resolver.zod(GetSimpleDesign),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const simpleDesign = await db.simpleDesigns.findFirst({ where: { id } });

    if (!simpleDesign) throw new NotFoundError();

    return simpleDesign;
  }
);
