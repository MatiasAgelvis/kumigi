import { AddIcon } from "@chakra-ui/icons";
import { Box, ButtonGroup, Flex, IconButton, VStack } from "@chakra-ui/react";
// import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { ReactSortable } from "react-sortablejs";
import boxOptions from "../../../utils/boxOptions";
import buttonOptions from "../../../utils/buttonOptions";
import { randomLayer } from "../../../lib/avatara";
import { createLayer, idCard } from "../../../utils/createLayer";
import AccordionMenu from "../accordionMenu/accordionMenu";
import Card from "../card";
import Toolbar from "./toolbar";
import sizeComponents from "app/components/sizeComponents";

function Editor({ layerState, avatar, shapes, fonts, ...props }) {
  const [dragTarget, setDragTarget] = useState(-1);
  const [dragEvent, setDragEvent] = useState(false);
  const [{ present: layers }, { set: setLayers }] = layerState;

  const updateLayer = (index) => (update) => {
    console.log("update", index, layers[index], update);
    let layersUpdate = [...layers];
    layersUpdate[index] = {
      ...layersUpdate[index],
      ...update,
    };
    setLayers(layersUpdate);
  };

  const addLayer = (layer) => {
    setLayers([...layers, layer]);
  };

  const deleteLayer = (index) => () => {
    setLayers(layers.filter((_, i) => i != index));
  };

  return (
    <Flex justify={["center", null, "right"]} mx="1rem" {...props}>
      {/*    Editor    */}

      <Box
        {...boxOptions}
        // mx={["auto", "auto", "auto", 4]}
        w="clamp(200px,100%,700px)"
        // height="fit-content"
        p={["0.5rem", 5]}
      >
        <VStack spacing={4} align="stretch">
          <Toolbar layerState={layerState} />

          {/* Layer Stack */}
          <ReactSortable
            list={layers.map((x) => ({ ...x, chosen: true }))}
            setList={setLayers}
            animation={200}
            // delay={100}
            delayOnTouchStart={true}
            // touchStartThreshold={5}
            fallbackTolerance={2}
            handle=".dragHandle"
            onChoose={(e) => setDragTarget(e.oldIndex)}
            onStart={() => setDragEvent(true)}
            onEnd={() => setDragEvent(false)}
            onUnchoose={() => setDragTarget(-1)}
          >
            {layers.map((layer, i) => (
              <Card
                key={layer.id}
                index={i}
                layer={layer}
                updateLayer={updateLayer(i)}
                options={shapes}
                fonts={fonts}
                deleteLayer={deleteLayer(i)}
                dragEvent={dragEvent}
                dragTarget={i == dragTarget}
              />
            ))}
          </ReactSortable>
          {/* New Layer Button */}

          <ButtonGroup isAttached w="full">
            <IconButton
              {...buttonOptions}
              fontSize={"1.4rem"}
              onClick={() => addLayer(createLayer())}
              icon={<AddIcon />}
            />
            <IconButton
              {...buttonOptions}
              colorScheme="blue"
              w={["full", "90%", "60%"]}
              onClick={() => addLayer(idCard(randomLayer()))}
              fontSize={"2rem"}
              icon={<GiPerspectiveDiceSixFacesRandom />}
            />
          </ButtonGroup>
          <AccordionMenu
            name="Size Options"
            options={sizeComponents()}
            buttonProps={buttonOptions}
          />
        </VStack>
      </Box>
    </Flex>
  );
}

export default Editor;
