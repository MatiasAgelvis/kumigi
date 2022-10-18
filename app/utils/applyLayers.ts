import Avatara from "app/lib/avatara";
import type Layer from "app/lib/shapes";

export default function applyLayers(
  avatar: typeof Avatara,
  layers: Array<Layer>
) {
  layers.forEach((layer) => {
    if (layer.shape && layer.display) {
      avatar[layer.shape](layer);
    }
  });
}
