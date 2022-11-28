import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  PopoverProps,
  ButtonProps,
  PopoverHeaderProps,
  PopoverBodyProps,
  PopoverFooterProps,
  PopoverContentProps,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
export default function Popovero({
  arrow = false,
  closeButton = true,
  triggerer,
  contentProps,
  header,
  headerProps,
  body,
  bodyProps,
  footer,
  footerProps,
  ...props
}: {
  arrow?: boolean;
  closeButton?: boolean;
  triggerer: ReactNode;
  contentProps?: PopoverContentProps;
  header?: ReactNode;
  headerProps?: PopoverHeaderProps;
  body?: ReactNode;
  bodyProps?: PopoverBodyProps;
  footer?: ReactNode;
  footerProps?: PopoverFooterProps;
} & PopoverProps) {
  const initialFocusRef = useRef(null);
  return (
    <Popover initialFocusRef={initialFocusRef} placement="bottom" {...props}>
      <PopoverTrigger>{triggerer}</PopoverTrigger>
      <PopoverContent {...contentProps}>
        {header ? (
          <PopoverHeader {...headerProps}>{header}</PopoverHeader>
        ) : null}
        {arrow && <PopoverArrow />}
        {closeButton && <PopoverCloseButton />}
        <PopoverBody {...bodyProps}>{body}</PopoverBody>
        {footer ? (
          <PopoverFooter {...footerProps}>{footer}</PopoverFooter>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
