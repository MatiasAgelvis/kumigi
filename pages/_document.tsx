import { ColorModeScript } from "@chakra-ui/react"
import Document, { Html, Main, NextScript, Head } from "next/document"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode="system" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
