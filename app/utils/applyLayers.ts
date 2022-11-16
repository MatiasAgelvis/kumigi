import Avatara from "app/lib/avatara";
import { Layer } from "app/lib/shapes";

export default function applyLayers(
  avatar: typeof Avatara,
  layers: Array<Layer>
) {
  layers.forEach((layer) => {
    if (layer.shape && (!("display" in layer) || layer.display)) {
      avatar[layer.shape](layer);
    }
  });
}
