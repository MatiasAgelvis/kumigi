import { atom } from "recoil";
import { layers__Default } from "./createCard";

export const layersAtom = atom({
  key: "layersState",
  default: layers__Default,
});

export const urlAtom = atom({
  key: "urlState",
  default: "",
});

export const baseAtom = atom({
  key: "baseState",
  default: "",
});

export const heightAtom = atom({
  key: "heightState",
  default: 200,
});

export const widthAtom = atom({
  key: "widthState",
  default: 200,
});
