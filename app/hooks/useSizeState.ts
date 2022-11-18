import { heightAtom, widthAtom } from "app/utils/store";
import { useRecoilState } from "recoil";

export default function useSizeState() {
  const [height, setHeight] = useRecoilState(heightAtom);
  const [width, setWidth] = useRecoilState(widthAtom);

  return { height, setHeight, width, setWidth };
}
