import { CloseIcon, EditIcon } from "@chakra-ui/icons"
import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  ButtonProps,
  IconButton,
  useDisclosure
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
  const { onOpen, onClose, isOpen } = useDisclosure()

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
            onClick={onOpen}
            {...editButtonProps}
          /> 
        }
        placement={"top"}
        body={<SizeFormatted index={index} onClose={onClose} />}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeButton={false}
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
