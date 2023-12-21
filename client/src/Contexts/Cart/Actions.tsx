import { IBook } from "@/models/response/Book/IBook";
import { ActionKind } from "./ActionKind";

type SetCart = {
  type: ActionKind.SetCart;
  payload: {
    cart: IBook[];
  };
};

type DeleteFromCart = {
  type: ActionKind.DeleteFromCart;
  payload: {
    bookID: string;
  };
};

type Loading = {
  type: ActionKind.Loading;
  payload?: string;
};

type AddToCart = {
  type: ActionKind.AddToCart;
  payload: {
    book: IBook;
  };
};

export type Action =
  | SetCart
  | Loading
  | DeleteFromCart
  | AddToCart;