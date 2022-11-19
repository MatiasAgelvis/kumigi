import { atom } from "recoil";
import { layers__Default } from "./createLayer";

export const layersAtom = atom({
  key: "layersState",
  default: layers__Default,
});

export const imageAtom = atom({
  key: "imageState",
  default: "",
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

export const nameAtom = atom({
  key: "nameState",
  default: "Name",
});
