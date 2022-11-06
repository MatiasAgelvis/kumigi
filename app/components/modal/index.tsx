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
  Wrap,
} from "@chakra-ui/react";
import { MouseEventHandler, ReactNode } from "react";

type Props = {
  open: ReactNode;
  modalHeader?: ReactNode;
  modalBody?: ReactNode;
  action?: string;
  onClickAction?: MouseEventHandler;
  buttonProps?: ButtonProps;
  modalProps?: ModalContentProps;
  extraActions?: Array<ReactNode>;
};

export default function Modalo({
  open,
  modalHeader,
  modalBody,
  action,
  onClickAction,
  buttonProps,
  modalProps,
  extraActions,
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
            <Wrap justify={"center"}>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              {action && (
                <Button colorScheme="teal" onClick={onClickAction}>
                  {action}
                </Button>
              )}
              {extraActions}
            </Wrap>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
