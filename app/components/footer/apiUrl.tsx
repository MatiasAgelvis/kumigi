import { Link, LinkProps } from "@chakra-ui/react";

export default function APIurl({ children, ...props }: LinkProps) {
  return (
    <Link style={{ lineBreak: "anywhere" }} {...props}>
      {children}
    </Link>
  );
}
