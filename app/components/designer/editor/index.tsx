import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Flex,
  FlexProps,
  IconButton,
  VStack,
} from "@chakra-ui/react";
// import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import boxOptions from "app/utils/boxOptions";
import buttonOptions from "app/utils/buttonOptions";
import { randomLayer } from "app/lib/avatara";
import { createLayer, idCard } from "app/utils/createLayer";
import AccordionMenu from "../accordionMenu/accordionMenu";
import Card from "../card";
import Toolbar from "./toolbar";
import { indexOfId } from "app/utils/indexOfId";
import SizeFormatted from "app/components/size/sizeFormatted";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { Layer, Shape, UseUndoType } from "app/types/avatara";
import { State, Actions } from "use-undo";
import DummyCard from "../card/dummy";

// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

function Editor({
  layerState,
  avatar,
  shapes,
  fonts,
  ...props
}: {
  layerState: UseUndoType<Layer[]>;
  avatar: any;
  shapes: Shape[];
  fonts: string[];
} & FlexProps) {
  const [{ present: layers }, { set: setLayers }] = layerState;

  const [isDragging, setIsDragging] = useState(-1);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragArrayMove(items, setItems) {
    return (event) => {
      const { active, over } = event;
      // console.log(active, over);
      if (over && active.id !== over.id) {
        const oldIndex = indexOfId(items, active.id);
        const newIndex = indexOfId(items, over.id);
        setItems(arrayMove(items, oldIndex, newIndex));
      }
    };
  }

  // console.log(layers);
  const updateLayer = (index) => (update) => {
    // console.log("update", index, layers[index], update);
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
    <Flex justify={["center", null, "right"]} {...props}>
      {/*    Editor    */}

      <Box
        h="fit-content"
        {...boxOptions}
        // mx={["auto", "auto", "auto", 4]}
        w="clamp(200px,100%,700px)"
        // height="fit-content"
        p={["0.5rem", 5]}
      >
        <VStack spacing={4} align="stretch">
          <Toolbar layerState={layerState} />

          {/* Layer Stack */}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(event) =>
              setIsDragging(indexOfId(layers, event.active.id))
            }
            onDragEnd={(event) => {
              handleDragArrayMove(layers, setLayers)(event);
              setIsDragging(-1);
            }}
          >
            <SortableContext
              items={layers.map((layer) => layer.id)}
              strategy={verticalListSortingStrategy}
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
                />
              ))}
            </SortableContext>
            <DragOverlay>
              {isDragging < 0 ? null : (
                <DummyCard index={1} layer={layers[isDragging]!} isOverlay />
              )}
            </DragOverlay>
          </DndContext>

          {/* New Layer Button */}
          <ButtonGroup isAttached w="full">
            <IconButton
              {...buttonOptions}
              aria-label="Add new empty layer"
              fontSize={"1.4rem"}
              onClick={() => addLayer(createLayer())}
              icon={<AddIcon />}
            />
            <IconButton
              {...buttonOptions}
              colorScheme="blue"
              aria-label="Add new random layer"
              w={["full", "90%", "60%"]}
              onClick={() => addLayer(idCard(randomLayer()))}
              fontSize={"2rem"}
              icon={<GiPerspectiveDiceSixFacesRandom />}
            />
          </ButtonGroup>
          {/*<AccordionMenu
            name="Size Options"
            body={<SizeFormatted />}
            buttonProps={buttonOptions}
            drawerProps={{
              ...boxOptions,
              // transform: "translateY(-15px)",
              // pt: "25px",
            }}
          />*/}
        </VStack>
      </Box>
    </Flex>
  );
}

export default Editor;
