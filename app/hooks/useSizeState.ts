import { currentSizeAtom, sizesAtom } from "app/utils/store"
import { SetterOrUpdater, useRecoilState } from "recoil"

export default function useSizeState(index: number) {
  const [sizes, setSizes]: [number[][], SetterOrUpdater<number[][]>] =
    useRecoilState(sizesAtom)
  const [currentSize, setCurrentSize] = useRecoilState(currentSizeAtom)

  function setSize(update: number[]) {
    const newSizeState = [...sizes]
    newSizeState[index] = update
    setSizes(newSizeState)
  }

  function deleteSize() {
    const newSizeState = [...sizes]
    newSizeState.splice(index, 1)
    // prevent empty size state
    setSizes(newSizeState.length == 0 ? [[400, 400]] : newSizeState)
    if (!(currentSize < newSizeState.length)) {
      setCurrentSize(newSizeState.length - 1)
    }
  }

  return { size: sizes[index]!, setSize, deleteSize, length: sizes.length }
}
