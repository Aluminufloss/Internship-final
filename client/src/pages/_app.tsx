import { CartProvider } from "@/Contexts/Cart/CartContext";
import { CatalogProvider } from "@/Contexts/Catalog/CatalogContext";
import { FavoriteProvider } from "@/Contexts/Favorite/FavoriteContext";
import { UserProvider } from "@/Contexts/User/UserContext";

import GlobalStyles from "@/styles/Globals";
import Theme from "@/styles/Theme";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Theme>
        <GlobalStyles />
        <CatalogProvider>
          <CartProvider>
            <FavoriteProvider>
              <UserProvider>
                <Component {...pageProps} />
              </UserProvider>
            </FavoriteProvider>
          </CartProvider>
        </CatalogProvider>
      </Theme>
    </>
  );
}
