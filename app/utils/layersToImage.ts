import Avatara from "app/lib/avatara";
import { Layer } from "app/types/avatara";

import applyLayers from "./applyLayers";

export default function layersToImage(
	layers: Layer[],
	width: number = 200,
	height: number = 200
) {
	const avatar = new Avatara(width, height);
	applyLayers(avatar, layers);
	return avatar.toDataURL();
}
