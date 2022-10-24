import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ButtonProps,
  ModalContentProps,
} from "@chakra-ui/react";
import { MouseEventHandler, ReactNode } from "react";

type Props = {
  open: ReactNode;
  modalHeader?: string;
  modalBody?: ReactNode;
  action: string;
  onClickAction: MouseEventHandler;
  buttonProps?: ButtonProps;
  modalProps?: ModalContentProps;
};

export default function Modalo({
  open,
  modalHeader,
  modalBody,
  action,
  onClickAction,
  buttonProps,
  modalProps,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} {...buttonProps}>
        {open}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent {...modalProps}>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={onClickAction}>
              {action}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
