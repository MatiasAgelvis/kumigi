import { Routes } from "@blitzjs/next";
import boxOptions from "app/utils/boxOptions";
import { Box, Button, Center, ModalProps } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

import ImageBox from "../designer/image/imageBox";
import Avatara from "app/lib/avatara";
import applyLayers from "app/utils/applyLayers";
import Modalo from "../modal";
import { useRecoilState } from "recoil";
import { layersAtom } from "app/utils/store";
import { useRouter } from "next/router";
import DownloadButton from "../designer/image/downloadButton";
import { Layer } from "app/lib/shapes";
import { EditIcon } from "@chakra-ui/icons";

function Avatar({
  layers: startLayers,
  size,
  header,
  footer: __footer,
  ...props
}: {
  layers: Layer[];
  size: { height: number; width: number };
  header?: ReactNode;
  footer?: ReactNode[];
  props?: ModalProps;
}) {
  const { height, width } = size;
  const avatar = new Avatara(width, height);
  const [layers] = useState(startLayers);
  applyLayers(avatar, layers);
  const [editorLayers, setEditorLayers] = useRecoilState(layersAtom);
  const router = useRouter();
  const footer = __footer ? Array.from(__footer) : [];

  const imageBox = (
    <Center>
      <ImageBox image={avatar.toDataURL()} alt="random Avatar" />
    </Center>
  );

  return (
    <Modalo
      open={<Box {...boxOptions}>{imageBox}</Box>}
      buttonProps={{ variant: "link" }}
      header={header}
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
          leftIcon={<EditIcon />}
        >
          Edit
        </Button>,
        <DownloadButton
          key="download"
          canvas={avatar.canvas}
          w={"fit-content"}
        />,
        ...footer,
      ]}
      {...props}
    />
  );
}
export default Avatar;
