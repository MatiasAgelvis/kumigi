import Select from "react-select";
import { useState, useEffect } from "react";
import { RgbaStringColorPicker } from "react-colorful";

function Card({ id, updateLayer, options }) {
  const [shape, setShape] = useState(null);
  const [color, setColor] = useState("rgba(80,200,100,1)");

  useEffect(() => {
    updateLayer(id, { shape: shape, color: color });
  }, [shape, color]);

  return (
    <div>
      <Select
        options={options}
        onChange={(x) => setShape(x.value)}
        styles={{
          menu: (provided, state) => ({ ...provided, zIndex: 4 }),
        }}
      />
      <RgbaStringColorPicker color={color} onChange={setColor} />
    </div>
  );
}

export default Card;
