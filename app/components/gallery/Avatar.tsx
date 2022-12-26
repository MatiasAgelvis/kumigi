import boxOptions from "app/utils/boxOptions"
import { Box, BoxProps, Center, ModalProps } from "@chakra-ui/react"
import { ReactNode, useState } from "react"

import ImageBox from "../designer/image/imageBox"
import Avatara from "app/lib/avatara"
import applyLayers from "app/utils/applyLayers"
import Modalo from "../modal"

import DownloadButton from "../functionButtons/downloadButton"
import { Layer } from "app/types/avatara"

import { name__default } from "app/utils/name"
import EditButton from "../functionButtons/editButton"
import { useRecoilValue } from "recoil"
import { currentSizeAtom } from "app/utils/store"

function Avatar({
  layers: startLayers,
  name = name__default,
  sizes,
  header,
  openProps,
  footer: __footer,
  ...props
}: {
  layers: Layer[]
  name: string
  sizes: number[][]
  header?: ReactNode
  openProps?: BoxProps
  footer?: ReactNode[]
} & Omit<ModalProps, "children" | "isOpen" | "onClose">) {
  const currentSize = useRecoilValue(currentSizeAtom)
  const [width, height] = sizes[currentSize]!
  const avatar = new Avatara(width, height)
  const [layers] = useState(startLayers)
  applyLayers(avatar, layers)

  const footer = __footer ? Array.from(__footer) : []

  const imageBox = (
    <Center>
      <ImageBox image={avatar.toDataURL()} alt="random Avatar" />
    </Center>
  )

  return (
    <Modalo
      open={
        <Box {...boxOptions} {...openProps}>
          {imageBox}
        </Box>
      }
      buttonProps={{ variant: "link" }}
      header={header}
      body={imageBox}
      modalProps={boxOptions}
      footer={[
        <EditButton key="edit" layers={layers} name={name} sizes={sizes} />,
        <DownloadButton
          key="download"
          layers={layers}
          sizes={sizes}
          w={"fit-content"}
        />,
        ...footer,
      ]}
      {...props}
    />
  )
}
export default Avatar
