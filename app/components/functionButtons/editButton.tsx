import { Button, ButtonProps, Center } from "@chakra-ui/react"
import { ReactNode, useState } from "react"

import Avatara from "app/lib/avatara"
import applyLayers from "app/utils/applyLayers"
import { useRecoilState } from "recoil"
import { layersAtom, nameAtom, sizesAtom } from "app/utils/store"
import { useRouter } from "next/router"
import { Layer } from "app/types/avatara"
import { EditIcon } from "@chakra-ui/icons"
import { name__default } from "app/utils/name"
import useSizeState from "app/hooks/useSizeState"

export default function EditButton({
  layers: startLayers,
  name = name__default,
  sizes,
  ...props
}: {
  layers: Layer[]
  name: string
  sizes: number[][]
} & ButtonProps) {
  const [width, height] = sizes[0]!
  const avatar = new Avatara(width, height)
  const [layers] = useState(startLayers)
  applyLayers(avatar, layers)
  const [editorLayers, setEditorLayers] = useRecoilState(layersAtom)
  const [nameState, setNameState] = useRecoilState(nameAtom)
  // const { setSize } = useSizeState(0)
  const [sizesRecoil, setSizes] = useRecoilState(sizesAtom)
  const router = useRouter()

  return (
    <Button
      colorScheme={"teal"}
      onClick={() => {
        setEditorLayers(layers)
        setNameState(name)
        setSizes(sizes)
        router.push("#")
      }}
      leftIcon={<EditIcon />}
      {...props}
    >
      Edit
    </Button>
  )
}
