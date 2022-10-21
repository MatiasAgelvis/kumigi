import RangeInput from "app/components/designer/editor/rangeInput";
import sizeState from "app/utils/sizeState";

export default function sizeComponents() {

  const { height, setHeight, width, setWidth } = sizeState()
  
  return ([{
    name: "Height",
    input: <RangeInput value={height} setValue={setHeight} max={2000} />,
  },
  {
    name: "Width",
    input: <RangeInput value={width} setValue={setWidth} max={2000} />,
  },
  ])
}