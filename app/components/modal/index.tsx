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
import { ReactNode } from "react";

type Props = {
  open: ReactNode;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  buttonProps?: ButtonProps;
  modalProps?: ModalContentProps;
  extraActions?: Array<ReactNode>;
};

export default function Modalo({
  open,
  header,
  body,
  footer,
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
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>

          <ModalFooter>
            <Wrap justify={"center"}>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              {footer}
            </Wrap>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
