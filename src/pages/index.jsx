import { useState } from "react";
import App from "../components/app";
import Header from "../components/header";
import Footer from "../components/footer";
import { v4 as uuidv4 } from "uuid";
import { Grid, GridItem } from "@chakra-ui/react";

function Main() {
  const [url, setURL] = useState(null)

  return (
    <Grid templateRows='repeat(3, auto)'>
      <GridItem>
        <Header />
      </GridItem>
      <GridItem>
        <App setURL={setURL}/>
      </GridItem>
      <GridItem>
        <Footer url={url}/>
      </GridItem>
    </Grid>
  );
}

export default Main;
