import RangeInput from "app/components/designer/editor/rangeInput";
import useSizeState from "app/hooks/useSizeState";
import { Options } from "app/components/formatting/fullWidth";

export default function useSizeComponents(): Options {
  const { height, setHeight, width, setWidth } = useSizeState();

  return [
    {
      name: "Height",
      input: <RangeInput value={height} setValue={setHeight} max={2000} />,
    },
    {
      name: "Width",
      input: <RangeInput value={width} setValue={setWidth} max={2000} />,
    },
  ];
}
