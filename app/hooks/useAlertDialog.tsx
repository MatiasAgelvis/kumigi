import {
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogProps,
  ButtonProps,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
export default function useAlertDialog() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const cancelRef = useRef();

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    component: ({
      header,
      body,
      action,
      onClick,
      buttonProps,
      ...props
    }: {
      header: ReactNode;
      body: ReactNode;
      action: string;
      onClick: () => void;
      buttonProps?: ButtonProps;
      props?: AlertDialogProps;
    }) => (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        {...props}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>{body}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="yellow"
                onClick={() => {
                  onClick();
                  onClose();
                }}
                ml={3}
                {...buttonProps}
              >
                {action}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    ),
  };
}
