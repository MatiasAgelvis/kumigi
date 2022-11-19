import { Layer, LayerNoId, Shape } from "app/types/avatara";
import { randomLayer } from "../lib/avatara";

export function makeLayers(
  shapes: Shape[],
  colors: string[],
  texts: string[],
  fonts: string[]
): LayerNoId[] {
  return shapes.map((shape, i) => {
    return shape === "random"
      ? randomLayer()
      : {
          shape: shape,
          color: colors[i % colors.length]!,
          text: shape == "text" ? texts.shift()! : "",
          font: shape == "text" ? fonts.shift()! : "pt",
          display: true,
        };
  });
}
