import { sizesAtom } from "app/utils/store"
import { useRecoilState } from "recoil"

export default function useSizeState(index: number) {
  const [sizes, setSizes] = useRecoilState(sizesAtom)

  function setSize(update: number[]) {
    const newState = [...sizes]
    newState[index] = update
    setSizes(newState)
  }

  return { size: sizes[index]!, setSize }
}
