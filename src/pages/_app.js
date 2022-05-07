import { ChakraProvider } from "@chakra-ui/react";
import '../../public/css/fonts.css'

function App({ Component, pageProps }) {
  return (
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
  );
}

export default App;
