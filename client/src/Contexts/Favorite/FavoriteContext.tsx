import { createContext, useContext, useReducer } from "react";

import { IBook } from "@/models/response/Book/IBook";

import { ActionKind } from "./ActionKind";

import AuthService from "@/services/AuthService";
import { FavoriteState } from "./FavoriteType";
import { favoriteReducer } from "./FavoriteReducer";

export type FavoriteContextType = {
  favoriteState: FavoriteState;
  setFavorite: (favorite: IBook[]) => void;
  deleteFromFavorite: (bookID: string, accessToken: string, refreshToken: string) => void;
  addToFavorite: (bookID: string, accessToken: string, refreshToken: string) => void;
};

const initialState: FavoriteContextType = {
  favoriteState: {
    favorite: [],
    isLoading: false,
  },
  setFavorite: () => null,
  addToFavorite: () => null,
  deleteFromFavorite: () => null,
};

const FavoriteContext = createContext<FavoriteContextType>(initialState);

type FavoriteProviderType = {
  children?: React.ReactNode;
};

function FavoriteProvider(
  { children }: FavoriteProviderType,
  initialState: FavoriteState,
) {
  const [favoriteState, dispatch] = useReducer(favoriteReducer, initialState);

  function setFavorite(favorite: IBook[]) {
    dispatch({ type: ActionKind.Loading });
    dispatch({ type: ActionKind.SetFavorite, payload: { favorite } });
  }

  async function deleteFromFavorite(bookID: string, accessToken: string, refreshToken: string) {
    dispatch({ type: ActionKind.Loading });
    try {
      await AuthService.deleteFromCart(bookID, accessToken, refreshToken);

      dispatch({ type: ActionKind.DeleteFromFavorite, payload: { bookID } });
    } catch (err) {
      console.log("Something wrong with deleting book from the favorites");
      throw err;
    }
  }

  async function addToFavorite(bookID: string, accessToken: string, refreshToken: string) {
    dispatch({ type: ActionKind.Loading });
    try {
      const response = await AuthService.addToCart(bookID, accessToken, refreshToken);
      const book = response.data;

      dispatch({ type: ActionKind.AddToFavorite, payload: { book } });
    } catch (err) {
      console.log("Something wrong with adding book to the cart");
      throw err;
    }
  }

  return (
    <FavoriteContext.Provider
      value={{
        favoriteState,
        setFavorite,
        deleteFromFavorite,
        addToFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

function useFavorite() {
  const context = useContext(FavoriteContext);
  return context;
}

export { FavoriteProvider, useFavorite };
