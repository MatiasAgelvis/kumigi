import { Link } from "@chakra-ui/react";

export default function APIurl({ url }) {
  return (
    url && (
      <Link style={{ lineBreak: "anywhere" }} href={url}>
        {url}
      </Link>
    )
  );
}
