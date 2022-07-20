import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import "../../public/css/fonts.css";
import "../../public/css/dragHandle.css";

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
