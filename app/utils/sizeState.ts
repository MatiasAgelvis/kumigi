import { heightAtom, widthAtom } from "./store";
import { useRecoilState } from "recoil";

export default function sizeState() {

  const [height, setHeight] = useRecoilState(heightAtom);
  const [width, setWidth] = useRecoilState(widthAtom);


  return { height, setHeight, width, setWidth }
};