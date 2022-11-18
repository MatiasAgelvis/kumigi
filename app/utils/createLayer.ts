import { Layer } from "app/types/avatara";
import { v4 as uuidv4 } from "uuid";

export function createLayer(): Layer {
  return idCard({
    shape: null,
    color: "#000000",
    text: "",
    font: "pt",
    display: true,
  });
}

export function idCard(layer: Layer): Layer {
  return { id: uuidv4(), ...layer };
}

export const layers__Default: Array<Layer> = [idCard(createLayer())];
