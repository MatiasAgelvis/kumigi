import Head from "next/head";
import React, { FC } from "react";
import { BlitzLayout } from "@blitzjs/next";
import { VStack } from "@chakra-ui/react";
import Header from "app/components/header";
import Footer from "app/components/footer";

const Layout: BlitzLayout<{
  title?: string;
  children?: React.ReactNode;
  withFooter: Boolean;
}> = ({ title, children, withFooter }) => {
  return (
    <>
      <Head>
        <title>{title || "avatara-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack w="full" alignItems={"stretch"}>
        <Header />
        {children}
        {withFooter && <Footer />}
      </VStack>
    </>
  );
};

export default Layout;
