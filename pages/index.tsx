import { Suspense } from "react";
import Layout from "app/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { Box, Grid, Stack, VStack } from "@chakra-ui/react";
import Header from "app/components/header";
import Footer from "app/components/footer";
import Designer from "app/components/designer";
import UserInfo from "app/components/header/UserInfo";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import animationOptions from "app/utils/animationOptions";
import { layers__Default } from "app/utils/createCard";
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    <Layout title="Home" withFooter>
      <main>
        <Designer initialLayersState={layers__Default} />
      </main>
    </Layout>
  );
};

export default Home;
