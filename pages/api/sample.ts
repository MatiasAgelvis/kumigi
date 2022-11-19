import { BlitzNextApiResponse } from "@blitzjs/next";
import { NextApiRequest } from "next";
import Avatara from "../../app/lib/avatara";
import { parseAvataraQuery } from "../../app/utils/parseAvataraQuery";

const avatar = (req: NextApiRequest, res: BlitzNextApiResponse) => {
  const [height, width, layers] = parseAvataraQuery(req.query);

  const avatar = new Avatara(width, height);
  avatar.randomAvatar();

  res.statusCode = 200;

  // returns the image directly to be downloaded
  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Content-Disposition",
    "attachment;filename=" + "avatara" + ".png"
  );

  return res.send(avatar.toBuffer());
};

export default avatar;
