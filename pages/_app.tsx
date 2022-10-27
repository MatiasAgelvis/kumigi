import {
  ErrorFallbackProps,
  ErrorComponent,
  ErrorBoundary,
  AppProps,
} from "@blitzjs/next";
import { AuthenticationError, AuthorizationError } from "blitz";
import React from "react";
import { withBlitz } from "app/blitz-client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import "public/css/fonts.css";
import "public/css/dragHandle.css";
import { QueryClient, QueryClientProvider, useQuery } from "@blitzjs/rpc";

const queryClient = new QueryClient();

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    );
  }
}

const theme = extendTheme({});

QueryClientProvider;

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
        </ChakraProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default withBlitz(MyApp);
