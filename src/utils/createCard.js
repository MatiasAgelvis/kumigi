import { v4 as uuidv4 } from "uuid";

export function createCard() {
  return { id: uuidv4(), shape: null, color: "rgba(0,0,0,1)" };
}

export const layers__Default = [createCard()];
