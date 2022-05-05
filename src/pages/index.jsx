import Avatara from "../lib/avatara";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import Card from "../components/card";

const width = 200;
const height = 200;

function applyLayers(avatar, layers) {
  for (let [ key, layer ] of Object.entries(layers)) {
    if (layer.shape) {
      avatar[layer.shape](layer.color);
    }
  }
}

function App() {
  const avatar = new Avatara(width, height);

  const options = [
    { value: "background", label: "Background" },
    { value: "square", label: "Square" },
    { value: "circle", label: "Circle" },
    { value: "rectangle", label: "Rectangle" },
    { value: "gradient", label: "Gradient" },
  ];

  const [image, setImage] = useState(avatar.toDataURL());
  const [layers, setLayers] = useState({});
  const [list, setList] = useState([0]);
  const layersString = JSON.stringify(layers);

  applyLayers(avatar, layers);

  const updateLayer = (id, update) => {
    setLayers({
      ...layers,
      [id]: { shape: update.shape, color: update.color },
    });
  };

  useEffect(() => {
    applyLayers(avatar, layers);
    setImage(avatar.toDataURL());
  }, [layersString]);

  return (
    <div className="columns">
      <div className="column">
        <ReactSortable list={list} setList={setList}>
          {list.map((_, i) => (
            <div key={i}>
              Layer {i}
              <Card id={i} updateLayer={updateLayer} options={options} />
            </div>
          ))}
        </ReactSortable>

        <button onClick={() => setList([...list, list.length])}>+</button>
      </div>
      <div className="column">
        <img src={image} width={width} height={height} />
      </div>
    </div>
  );
}

export default App;
