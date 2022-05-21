import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import App from "../components/app";
import Footer from "../components/footer";
import Header from "../components/header";
import { BASE } from "../utils/url";

function Main() {
  const [url, setURL] = useState(BASE);

  return (
    <Grid templateRows="repeat(3, auto)">
      <GridItem>
        <Header />
      </GridItem>
      <GridItem>
        <App setURL={setURL} />
      </GridItem>
      <GridItem>
        <Footer url={url} />
      </GridItem>
    </Grid>
  );
}

export default Main;
