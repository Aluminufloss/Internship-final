import { createContext, useContext, useReducer } from "react";

import { IBook } from "@/models/response/Book/IBook";

import { ActionKind } from "./ActionKind";
import { CartState } from "./CartType";
import { cartReducer } from "./CartReducer";

import AuthService from "@/services/AuthService";

export type CartContextType = {
  cartState: CartState;
  setCart: (cart: IBook[]) => void;
  deleteFromCart: (bookID: string, accessToken: string, refreshToken: string) => void;
  addToCart: (bookID: string, accessToken: string, refreshToken: string) => void;
};

const initialState: CartContextType = {
  cartState: {
    cart: [],
    isLoading: false,
  },
  setCart: () => null,
  addToCart: () => null,
  deleteFromCart: () => null,
};

const CartContext = createContext<CartContextType>(initialState);

type CartProviderType = {
  children?: React.ReactNode;
};

function CartProvider(
  { children }: CartProviderType,
  initialState: CartState
) {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  function setCart(cart: IBook[]) {
    dispatch({ type: ActionKind.Loading });
    dispatch({ type: ActionKind.SetCart, payload: { cart } });
  }

  async function deleteFromCart(bookID: string, accessToken: string, refreshToken: string) {
    dispatch({ type: ActionKind.Loading });
    try {
      await AuthService.deleteFromCart(bookID, accessToken, refreshToken);

      dispatch({ type: ActionKind.DeleteFromCart, payload: { bookID } });
    } catch (err) {
      console.log("Something wrong with deleting book from the cart");
      throw err;
    }
  }

  async function addToCart(bookID: string, accessToken: string, refreshToken: string) {
    dispatch({ type: ActionKind.Loading });
  
    try {
      const response = await AuthService.addToCart(bookID, accessToken, refreshToken);
  
      if (response.data) {
        const book = response.data;
        console.log("eee book", book);
  
        dispatch({ type: ActionKind.AddToCart, payload: { book } });
      } else {
        // Handle the case when response.data is falsy (optional)
        console.log("Empty response data");
      }
    } catch (err) {
      console.log("Something wrong with adding book to the cart");
      throw err;
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartState,
        setCart,
        deleteFromCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, useCart };
