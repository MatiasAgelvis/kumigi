import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Avatara from "../../lib/avatara";
import applyLayers from "../../utils/applyLayers";
import { parseAvataraQuery } from "../../utils/parseAvataraQuery";

export default function Page() {
  const [html, setHtml] = useState({ __html: null });
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const [height, width, layers] = parseAvataraQuery(
        router.query,
        router.query.shapes || []
      );
      const avatar = new Avatara(width, height);
      applyLayers(avatar, layers);
      setHtml({ __html: avatar.toHTML() });
    }
  }, [router.isReady]);

  return <div dangerouslySetInnerHTML={html} />;
}
