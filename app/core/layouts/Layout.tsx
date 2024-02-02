import Head from "next/head";
import React, { FC } from "react";
import { Box, VStack } from "@chakra-ui/react";
import Header from "app/components/header";
import Footer from "app/components/footer";
import boxOptions from "app/utils/boxOptions";

const Layout = ({ title, children, withFooter = false }) => {
  return (
    <>
      <Head>
        <title>{title || "avatara-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack w="full" alignItems={"stretch"}>
        <Header />
        <Box w="full" p={boxOptions.p}>
          {children}
        </Box>
        {withFooter && <Footer />}
      </VStack>
    </>
  );
};

export default Layout;
