import { Layer, NotNestedObject, OKey } from "app/types/avatara"
import urlJoin from "url-join"

export default function makeApiUrl(
  base: string,
  layers: Layer[],
  sizes: number[][]
) {
  const displayedLayers = layers.filter((layer) => layer.display)
  const layersUrl = displayedLayers.map((layer) =>
    (
      `${layer.shape},` +
      // remove # from hex colors
      `${layer.color.replace("#", "")},` +
      `${layer.font},` +
      `${layer.text}`
    ).replace(
      // remove trailing commas
      /,+$/,
      ""
    )
  )

  return urlJoin(base || "", "api", ...layersUrl)
}
