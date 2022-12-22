import { Button, ButtonProps } from "@chakra-ui/react"
import { DownloadIcon } from "@chakra-ui/icons"
import { Layer, LayerNoId } from "app/types/avatara"
import generateResponse from "app/utils/generateResponse"
import saveAs from "file-saver"

export default function DownloadButton({
  message = "Download",
  layers,
  sizes,
  ...props
}: {
  message?: string
  layers: Layer[] | LayerNoId[]
  sizes: number[][]
} & ButtonProps) {
  return (
    <Button
      leftIcon={<DownloadIcon />}
      onClick={() => {
        const res = generateResponse(layers, sizes, true)
        sizes.length == 1
          ? saveAs(res, "avatara.png")
          : res.then(function (blob) {
              saveAs(blob, "avatara.zip")
            })
      }}
      {...props}
    >
      {message}
    </Button>
  )
}
