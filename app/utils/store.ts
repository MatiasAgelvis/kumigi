import { atom } from "recoil"
import { layers__Default } from "./createLayer"

export const layersAtom = atom({
  key: "layersState",
  default: layers__Default,
})

export const imageAtom = atom({
  key: "imageState",
  default: "",
})

export const urlAtom = atom({
  key: "urlState",
  default: "",
})

export const locationAtom = atom({
  key: "locationState",
  default: {},
})

export const currentSizeAtom = atom({
  key: "sizeState",
  default: 0,
})

export const sizesAtom = atom({
  key: "sizesState",
  default: [[400, 400]],
})

export const nameAtom = atom({
  key: "nameState",
  default: "Name",
})
