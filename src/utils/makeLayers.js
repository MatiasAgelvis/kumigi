import { randomLayer } from "../lib/avatara";
import { queue } from "../utils/common";

export function makeLayers(shapes, colors, texts, fonts) {
  return shapes.map((shape, i) => {
    return shape === "random"
      ? randomLayer()
      : {
          shape: shape,
          color: queue(colors, i),
          ...(shape == "text" && {
            text: texts.shift(),
            font: queue(fonts),
          }),
        };
  });
}
