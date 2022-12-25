import { useRouter } from "next/router"
import Avatara from "../../app/lib/avatara"
import { parseAvataraQuery } from "../../app/utils/parseAvataraQuery"
import applyLayers from "../../app/utils/applyLayers"
import { ReactNode, useEffect, useState } from "react"
import { Layer, LayerNoId, SetStateType } from "app/types/avatara"
import { Box, Code, VStack, Wrap } from "@chakra-ui/react"
import ImageBox from "app/components/designer/image/imageBox"

export default function Page() {
  const [results, setResults]: SetStateType<ReactNode[]> = useState([
    <Box key="placeholder">Please Wait</Box>,
  ])
  const router = useRouter()

  useEffect(() => {
    const images: ReactNode[] = []
    if (router.isReady) {
      const { sizes, layers } = parseAvataraQuery(router.query)

      sizes.forEach(([width, height]) => {
        const avatar = new Avatara(width, height)
        applyLayers(avatar, layers)
        images.push(
          <VStack>
            <Code>
              {width}x{height}
            </Code>
            <ImageBox
              image={avatar.toDataURL()}
              alt={`image in ${width} by ${height}`}
            />
          </VStack>
        )
      })

      setResults(images)
    }
  }, [router.query, router.isReady])

  return (
    <Wrap m={8} spacing={8}>
      {results}
    </Wrap>
  )
}
