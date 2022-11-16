import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
  DrawerProps,
  ButtonProps,
  BoxProps,
} from "@chakra-ui/react";
import { FC, ReactNode, useRef } from "react";

interface UseDrawerProps
  extends Omit<DrawerProps, "children" | "isOpen" | "onClose"> {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  closeButtonProps?: ButtonProps;
}

export default function useDrawer(
  headerCloseButton: boolean = true,
  footerCloseButton: boolean = true
) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const btnRef = useRef(null);

  return {
    toggle: ({ children, ...props }: ButtonProps) => (
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} {...props}>
        {children}
      </Button>
    ),
    drawer: ({
      isOpen: drawerIsOpen = isOpen,
      onClose: drawerOnClose = onClose,
      header,
      children,
      footer,
      closeButtonProps,
      ...props
    }: UseDrawerProps) => (
      <Drawer
        isOpen={drawerIsOpen}
        onClose={drawerOnClose}
        finalFocusRef={btnRef}
        {...props}
      >
        <DrawerOverlay />
        <DrawerContent>
          {headerCloseButton && <DrawerCloseButton />}
          <DrawerHeader>{header}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter>
            {footer}
            {footerCloseButton && (
              <Button
                variant="outline"
                mr={3}
                onClick={onClose}
                {...closeButtonProps}
              >
                Close
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
    controls: { isOpen, onOpen, onClose, onToggle },
  };
}
