import { Routes } from "@blitzjs/next";
import boxOptions from "app/utils/boxOptions";
import { Box, Center } from "@chakra-ui/react";
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
      action="Open in Editor"
      modalBody={imageBox}
      onClickAction={() => {
        setEditorLayers(layers);
        router.push(Routes.Home());
      }}
      modalProps={boxOptions}
      extraActions={[
        <DownloadButton
          canvas={avatar.canvas}
          w={"fit-content"}
          key={"download"}
        />,
      ]}
      {...props}
    />
  );
}
export default Avatar;
