import { CloseIcon, EditIcon } from "@chakra-ui/icons"
import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  ButtonProps,
  IconButton,
} from "@chakra-ui/react"
import useSizeState from "app/hooks/useSizeState"
import { currentSizeAtom } from "app/utils/store"
import { useRecoilState } from "recoil"
import Popovero from "../popover"
import SizeFormatted from "./sizeFormatted"

export default function SizePill({
  index,
  editButtonProps,
  deleteButtonProps,
  mainButtonProps,
  ...props
}: {
  index: number
  editButtonProps?: ButtonProps
  deleteButtonProps?: ButtonProps
  mainButtonProps?: ButtonProps
} & ButtonGroupProps) {
  const { size, setSize, deleteSize, length: sizeLength } = useSizeState(index)
  const [width, height] = size
  const [currentSize, setCurrentSize] = useRecoilState(currentSizeAtom)

  return (
    <ButtonGroup
      isAttached
      variant={currentSize == index ? "solid" : "outline"}
      {...props}
    >
      <Popovero
        triggerer={
          <IconButton
            icon={<EditIcon />}
            aria-label="Change size"
            {...editButtonProps}
          />
        }
        placement={"top"}
        body={<SizeFormatted index={index} />}
      />

      <Button
        onClick={() => {
          setCurrentSize(index)
        }}
      >
        {width}x{height}
      </Button>

      <IconButton
        icon={<CloseIcon />}
        aria-label="Delete size"
        onClick={deleteSize}
        disabled={sizeLength == 1}
      />
    </ButtonGroup>
  )
}
