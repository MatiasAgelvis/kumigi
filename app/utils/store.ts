import { atom, selector } from "recoil"
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

export const nameAtom = atom({
  key: "nameState",
  default: "Name",
})

const _default_size = [[400, 400]]
const sizesAtomRoot = atom({
  key: "sizesStateRoot",
  default: _default_size,
})

export const sizesAtom = selector({
  key: "sizesState",
  get: ({ get }) => get(sizesAtomRoot),
  set: ({ set }, newValue) =>
    set(
      sizesAtomRoot,
      !Array.isArray(newValue) || !newValue.length ? _default_size : newValue
    ),
})
