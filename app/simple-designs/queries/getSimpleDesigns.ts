import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetSimpleDesignsInput
  extends Pick<
    Prisma.SimpleDesignsFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSimpleDesignsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: simpleDesigns,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.simpleDesigns.count({ where }),
      query: (paginateArgs) =>
        db.simpleDesigns.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      simpleDesigns,
      nextPage,
      hasMore,
      count,
    };
  }
);
