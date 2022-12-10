import { Layer, LayerNoId } from "app/types/avatara"
import { v4 as uuidv4 } from "uuid"

export function createLayer(): Layer {
  return idCard({
    shape: "empty",
    color: "#000000",
    text: "",
    font: "pt",
    display: true,
  })
}

export function idCard(layer: LayerNoId): Layer {
  return { id: uuidv4(), ...layer }
}

export const layers__Default: Array<Layer> = [idCard(createLayer())]
