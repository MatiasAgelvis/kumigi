import { useRouter } from "next/router";
import Avatara from "../../app/lib/avatara";
import { parseAvataraQuery } from "../../app/utils/parseAvataraQuery";
import applyLayers from "../../app/utils/applyLayers";
import { useEffect, useState } from "react";

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
