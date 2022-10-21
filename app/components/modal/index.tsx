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
  ModalProps,
  ButtonProps,
} from "@chakra-ui/react";
import { MouseEventHandler, ReactNode } from "react";

type Props = {
  open: string;
  modalHeader?: string;
  modalBody?: ReactNode;
  action: string;
  onClickAction: MouseEventHandler;
  buttonProps?: ButtonProps;
};

export default function Modalo({
  open,
  modalHeader,
  modalBody,
  action,
  onClickAction,
  buttonProps,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} {...buttonProps}>
        {open}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
