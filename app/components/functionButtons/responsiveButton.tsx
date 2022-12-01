import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";

export default function ResponsiveButton({
  label,
  icon,
  iconSide,
  ...props
}: {
  label: string;
  icon: ReactElement;
  iconSide: "left" | "right";
} & Omit<ButtonProps, "leftIcon" | "rightIcon"> &
  Omit<IconButtonProps, "aria-label" | "icon">) {
  const iconbtn = <IconButton aria-label={label} icon={icon} {...props} />;

  const fullbtn = (
    <Button
      {...(iconSide == "left" ? { leftIcon: icon } : { rightIcon: icon })}
      {...props}
    >
      {label}
    </Button>
  );
  return useBreakpointValue([iconbtn, fullbtn]);
}
