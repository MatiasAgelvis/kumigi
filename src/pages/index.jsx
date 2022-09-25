import { Grid } from "@chakra-ui/react";
import Designer from "../components/designer";
import Footer from "../components/footer";
import Header from "../components/header";

function Main() {
  return (
    <Grid templateRows="repeat(3, auto)">
      <Header />
      <Designer />
      <Footer />
    </Grid>
  );
}

export default Main;
