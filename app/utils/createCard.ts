import { v4 as uuidv4 } from "uuid";
import { Layer } from "app/lib/shapes";

export function createCard(): Layer {
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

export const layers__Default: Array<Layer> = [createCard()];
