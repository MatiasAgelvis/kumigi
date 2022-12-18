import { currentSizeAtom, sizesAtom } from "app/utils/store"
import { useRecoilValue } from "recoil"

export default function useSize() {
  const currentSize = useRecoilValue(currentSizeAtom)
  const sizes = useRecoilValue(sizesAtom)

  return { width: sizes[currentSize]![0], height: sizes[currentSize]![1] }
}
