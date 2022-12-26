import { atom, selector } from "recoil"
import { layers__Default } from "./createLayer"
import { _default_size } from "./defaults"

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
