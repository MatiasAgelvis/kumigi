export default function applyLayers(avatar, layers) {
  layers.forEach((layer) => {
    if (layer.shape) {
      avatar[layer.shape](layer);
    }
  });
}
