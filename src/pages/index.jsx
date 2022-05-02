import Avatara from "../lib/avatara";
import { useState, useEffect } from "react";

const avatar = new Avatara();

function App() {

  const [ shape, setShape ] = useState("");
  const [ color, setColor ] = useState("");
  const [ image, setImage ] = useState(avatar.toDataURL());

  const onChange = (setter) => (event) => setter(event.target.value)

  const updateShape = () => {
    avatar[shape](color)
    setImage(avatar.toDataURL());
    setShape("");
    setColor("");
  };

  return (
    <div>
      <div>Enter Shape</div>
      <input type="text" onChange={onChange(setShape)} value={shape} />
      <div>Enter Color</div>
      <input type="text" onChange={onChange(setColor)} value={color}/>
      <br />
      <button onClick={updateShape}>Enter</button>
      <br />
      <br />
      <img src={image} />
    </div>
  );
}

export default App;
