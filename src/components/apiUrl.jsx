import { Link } from "@chakra-ui/react";

export default function APIurl({ url }) {
  return url && <Link href={url}>{url}</Link>;
}
