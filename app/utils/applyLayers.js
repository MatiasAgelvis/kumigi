export default function applyLayers(avatar, layers) {
  layers.forEach((layer) => {
    if (layer.shape) {
      if (layer.shape != "text") {
        avatar[layer.shape](layer.color);
      } else {
        avatar[layer.shape](layer.color, layer.text, layer.font);
      }
    }
  });
}
