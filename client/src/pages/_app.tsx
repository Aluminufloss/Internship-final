import { UserProvider } from "@/Contexts/UserContext";

import GlobalStyles from "@/styles/Globals";
import Theme from "@/styles/Theme";

import type { AppProps } from "next/app";


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
