import Avatara from "../lib/avatara";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import Card from "../components/card";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Grid,
  GridItem,
  Center,
  Heading,
  Box,
  Image,
  Divider,
  Flex,
} from "@chakra-ui/react";

const width = 200;
const height = 200;

const boxOptions = {
  borderWidth: "3px",
  borderRadius: "lg",
  p: 5,
  shadow: "md",
};

function applyLayers(avatar, layers) {
  for (let [key, layer] of Object.entries(layers)) {
    if (layer.shape) {
      if (layer.shape != "text") {
        avatar[layer.shape](layer.color);
      } else {
        avatar[layer.shape](layer.text, layer.color, layer.font);
      }
    }
  }
}

function App() {
  const avatar = new Avatara(width, height);

  const options = [
    "background",
    "square",
    "circle",
    "rectangle",
    "gradient",
    "text",
  ];

  const fonts = avatar.fonts();

  const createCard = () => {
    return { id: uuidv4(), shape: null, color: "rgba(80,200,100,1)" };
  };

  const [image, setImage] = useState(avatar.toDataURL());
  const [layers, setLayers] = useState([createCard()]);
  const layersString = JSON.stringify(layers);

  applyLayers(avatar, layers);

  const updateLayer = (index) => (update) => {
    let layersUpdate = [...layers];
    layersUpdate[index] = {
      ...layersUpdate[index],
      ...update,
    };
    setLayers(layersUpdate);
  };

  const deleteLayer = (index) => () => {
    let layersUpdate = layers.filter((_, i) => i != index);
    setLayers(layersUpdate);
  };

  useEffect(() => {
    applyLayers(avatar, layers);
    setImage(avatar.toDataURL());
  }, [layersString]);

  return (
    <Flex
      m="1rem"
      align="start"
      justify="space-evenly"
      wrap="wrap-reverse"
      direction="row"
      gap="4"
    >
      {/*    Editor    */}
      <Box {...boxOptions} minWidth="50%">
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
                  <Card
                    index={i}
                    updateLayer={updateLayer(i)}
                    options={options}
                    fonts={fonts}
                    deleteLayer={deleteLayer(i)}
                  />
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
      </Box>
      {/*    Image    */}
      <Box sx={{alignSelf:'stretch'}}>
      <Box {...boxOptions} sx={{ position: "-webkit-sticky", position: "sticky", top: "20%" }}>
        <Center>
          <Heading>Avatara</Heading>
        </Center>
        <Divider
          orientation="horizontal"
          border={2}
          borderColor="gray.300"
          borderRadius="8"
          my={5}
        />
        <Center>
          <Image
            src={image}
            border="1px"
            borderColor={"gray.200"}
            shadow="md"
            htmlWidth={width}
            htmlHeight={height}
          />
        </Center>

        {/*<Divider orientation="horizontal" border={2} borderColor='gray.300' borderRadius='8' m={5}/>

            cURL: www.5rriente.com*/}
      </Box>
      </Box>
    </Flex>
  );
}

export default App;
