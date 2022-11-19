import Avatara from "app/lib/avatara";
import { Layer, LayerNoId } from "app/types/avatara";

export default function applyLayers(
  avatar: typeof Avatara,
  layers: Layer[] | LayerNoId[]
) {
  layers.forEach((layer) => {
    if (!("display" in layer) || layer.display) {
      avatar[layer.shape](layer);
    }
  });
}
