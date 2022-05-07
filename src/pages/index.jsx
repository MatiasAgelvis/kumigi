import Avatara from "../lib/avatara";
import { useState, useEffect, forwardRef } from "react";
import { ReactSortable } from "react-sortablejs";
import Card from "../components/card";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Center,
  VStack,
  StackDivider,
  Box,
  Image,
} from "@chakra-ui/react";

const width = 200;
const height = 200;

function applyLayers(avatar, layers) {
  for (let [key, layer] of Object.entries(layers)) {
    if (layer.shape) {
      if (layer.shape != 'text'){avatar[layer.shape](layer.color);}
      else {avatar[layer.shape](layer.text, layer.color, layer.font);}
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
    { value: "text", label: "Text" },
  ];

  const [image, setImage] = useState(avatar.toDataURL());
  const [list, setList] = useState([0]);

  const createCard = () => {
    return { id: uuidv4(), shape: null, color: "rgba(80,200,100,1)" };
  };
  const [layers, setLayers] = useState([createCard()]);
  const layersString = JSON.stringify(layers);

  applyLayers(avatar, layers);

  const updateLayer = (index) => (update) => {
    let layersUpdate = [...layers];
    layersUpdate[index] = {
      ...layersUpdate[index],
      ...update
    };
    setLayers(layersUpdate);
  };

  useEffect(() => {
    applyLayers(avatar, layers);
    setImage(avatar.toDataURL());
  }, [layersString]);

  return (
    <Grid templateColumns="repeat(2, 2fr)" gap={4}>
        <Box borderWidth='3px' borderRadius='lg' p={5} shadow='md'>
      <GridItem>
        <Grid templateColumns="repeat(1, 2fr)" gap={4}>
          <GridItem>
              <ReactSortable
                list={layers}
                setList={setLayers}
                animation={200}
                delayOnTouchStart={true}
                fallbackTolerance={5}
              >
                {layers.map((layer, i) => (
                  <div key={layer.id}>
                    <Card index={i} updateLayer={updateLayer(i)} options={options} />
                  </div>
                ))}
              </ReactSortable>
          </GridItem>
          <GridItem>
            <Button
              variant="outline"
              colorScheme="teal"
              width="100%"
              onClick={() => setLayers([...layers, createCard()])}
            >
              +
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
      </Box>
      <GridItem>
      <Box borderWidth='3px' mt={20} borderRadius='lg' p={5} shadow='md' sx={{ position: '-webkit-sticky', position: 'sticky', top: '20', }}>
        <Center>
          <Image src={image} border='1px' borderColor={'gray.200'} shadow='md' htmlWidth={width} htmlHeight={height} />
        </Center>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default App;
