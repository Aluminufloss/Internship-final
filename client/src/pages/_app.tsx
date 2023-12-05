import { Auth, UserProvider } from "@/Contexts/UserContext";
import { useInitialized } from "@/hooks/useInitialized";

import GlobalStyles from "@/styles/Globals";
import Theme from "@/styles/Theme";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";


export default function App({ Component, pageProps }: AppProps) {
    return (
    <>
      <Theme>
        <GlobalStyles />
        <UserProvider>
          <Component {...pageProps} /> 
        </UserProvider>
      </Theme>
    </>
  );
}
