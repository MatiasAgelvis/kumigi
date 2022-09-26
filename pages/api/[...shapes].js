import Avatara from "../../app/lib/avatara";
import { parseAvataraQuery } from "../../app/utils/parseAvataraQuery";
import applyLayers from "../../app/utils/applyLayers";

const avatar = (req, res) => {
  const [height, width, layers] = parseAvataraQuery(
    req.query,
    req.query.shapes || []
  );

  const avatar = new Avatara(width, height);
  applyLayers(avatar, layers);

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
