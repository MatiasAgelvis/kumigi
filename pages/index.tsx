import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Button, Grid } from "@chakra-ui/react"
import Header from "app/components/header"
import Footer from "app/components/footer"
import Designer from "app/components/designer"
import UserInfo from "app/components/header/UserInfo"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <main>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>

        <Grid templateRows="repeat(3, auto)">
          <Header />
          <Designer />
          <Footer />
        </Grid>
      </main>
    </Layout>
  )
}

export default Home
