import Avatara from "../../lib/avatara";
import applyLayers from "../../utils/applyLayers";
import { parseAvataraQuery } from "../../utils/parseAvataraQuery";

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

  // return an html page just with the image
  // res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // return res.send(avatar.toHTML());
};

export default avatar;
