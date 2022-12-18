import RangeInput from "app/components/designer/editor/rangeInput"
import useSizeState from "app/hooks/useSizeState"
import { Options } from "app/components/formatting/fullWidth"

export default function useSizeComponents(index: number): Options {
  const { size, setSize } = useSizeState(index)
  const [width, height] = size

  function setHeight(height) {
    return setSize([width, height])
  }

  function setWidth(width) {
    return setSize([width, height])
  }

  return [
    {
      name: "Height",
      input: <RangeInput value={height!} setValue={setHeight} max={2000} />,
    },
    {
      name: "Width",
      input: <RangeInput value={width!} setValue={setWidth} max={2000} />,
    },
  ]
}
