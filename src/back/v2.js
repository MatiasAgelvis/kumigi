import { Router } from "express";
import Avatara from "../lib/avatara.js";
import applyLayers from "../utils/applyLayers.js";

var router = Router();

router.use((req, res) => {
  const shapes = req.path.split("/").slice(1);

  const [height, width, layers] = parseAvataraQuery(req.query, shapes);

  const avatar = new Avatara(width, height);
  applyLayers(avatar, layers);

  return res.send(avatar.toHTML());
});

export default router;
