import { Grid, GridItem } from "@chakra-ui/react";
import App from "../components/app";
import Footer from "../components/footer";
import Header from "../components/header";

function Main() {
  return (
    <Grid templateRows="repeat(3, auto)">
      <Header />
      <App />
      <Footer />
    </Grid>
  );
}

export default Main;
