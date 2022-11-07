import { Routes } from "@blitzjs/next";
import boxOptions from "app/utils/boxOptions";
import { Box, Button, Center } from "@chakra-ui/react";
import { useState } from "react";

import ImageBox from "../designer/image/imageBox";
import Avatara, { randomLayers } from "app/lib/avatara";
import applyLayers from "app/utils/applyLayers";
import Modalo from "../modal";
import sizeState from "app/utils/sizeState";
import { useRecoilState } from "recoil";
import { layersAtom } from "app/utils/store";
import { useRouter } from "next/router";
import DownloadButton from "../designer/image/downloadButton";
import { idCard } from "app/utils/createLayer";

function Avatar({ layers: startLayers, ...props }) {
  const { height, width } = sizeState();
  const avatar = new Avatara(width, height);
  const [layers] = useState(startLayers);
  applyLayers(avatar, layers);
  const [editorLayers, setEditorLayers] = useRecoilState(layersAtom);
  const router = useRouter();

  const imageBox = (
    <Center>
      <ImageBox image={avatar.toDataURL()} alt="random Avatar" />
    </Center>
  );

  return (
    <Modalo
      open={<Box {...boxOptions}>{imageBox}</Box>}
      buttonProps={{ variant: "link" }}
      body={imageBox}
      modalProps={boxOptions}
      footer={[
        <Button
          key="edit"
          colorScheme={"teal"}
          onClick={() => {
            setEditorLayers(layers);
            router.push(Routes.Home());
          }}
        >
          Open in Editor
        </Button>,
        <DownloadButton
          key="download"
          canvas={avatar.canvas}
          w={"fit-content"}
        />,
      ]}
      {...props}
    />
  );
}
export default Avatar;
