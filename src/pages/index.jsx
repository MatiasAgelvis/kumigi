import Avatara from "../lib/avatara";
import { useState, useEffect } from "react";
import Select from 'react-select'
import Image from "next/image";
import { RgbaStringColorPicker } from "react-colorful";


const avatar = new Avatara();

function App() {
  const options = [
    { value: "background", label: "Background" },
    { value: "square", label: "Square" },
    { value: "circle", label: "Circle" },
    { value: "rectangle", label: "Rectangle" },
    { value: "gradient", label: "Gradient" },
  ];
  const defaultOption = options[0];

  const [shape, setShape] = useState(null);
  const [color, setColor] = useState("rgba(80,200,100,1)");
  const [image, setImage] = useState(avatar.toDataURL());

  const onChange = (setter) => (event) => {console.log(event.value); setter(event.value);}

  const updateShape = () => {
    console.log(shape)
    if (shape){
      avatar[shape](color);
      setImage(avatar.toDataURL());
    }
    else{alert('Select a Shape 乁| ･ 〰 ･ |ㄏ')}
  };


  return (
    <div>
      <div>Enter Shape</div>
      <Select
        options={options}
        onChange={(x) => setShape(x.value)}
        styles={{menu: (provided, state) => ({...provided,zIndex: 4})}}
      />
      <div>Enter Color</div>
      <RgbaStringColorPicker color={color} onChange={setColor} />
      <button onClick={updateShape}>Enter</button>
      <br/>
      <Image src={image} width={200} height={200}/>
    </div>
  );
}

export default App;
