import { v4 as uuidv4 } from "uuid";
import { Layer } from "../lib/shapes";

export function createCard() {
  return idCard({ shape: null, color: "#000000", text: "", font: "pt" });
}

export function idCard(layer) {
  return { id: uuidv4(), ...layer };
}

export const layers__Default: Array<Layer> = [createCard()];
