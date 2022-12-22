import { useRouter } from "next/router"
import Avatara from "../../app/lib/avatara"
import { parseAvataraQuery } from "../../app/utils/parseAvataraQuery"
import applyLayers from "../../app/utils/applyLayers"
import { useEffect, useState } from "react"
import { makeLayers } from "app/utils/makeLayers"
import { Shape } from "app/types/avatara"

export default function Page() {
  const [html, setHtml] = useState({ __html: "" })
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      // const [height, width, layers] = parseAvataraQuery(router.query);
      // console.log(layers);

      const layers = makeLayers(
        router.query.shapes as Shape[],
        colors as string[],
        texts as string[],
        fonts as string[]
      )
      const avatar = new Avatara(width as number, height as number)
      applyLayers(avatar, layers)
      setHtml({ __html: avatar.toHTML() })
    }
  }, [router.query, router.isReady])

  return <div dangerouslySetInnerHTML={html} />
}
