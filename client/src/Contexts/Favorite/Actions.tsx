import { IBook } from "@/models/response/Book/IBook";
import { ActionKind } from "./ActionKind";

type SetFavorite = {
  type: ActionKind.SetFavorite;
  payload: {
    favorite: IBook[];
  };
};

type DeleteFromFavorite = {
  type: ActionKind.DeleteFromFavorite;
  payload: {
    bookID: string;
  };
};

type Loading = {
  type: ActionKind.Loading;
  payload?: string;
};

type AddToFavorite = {
  type: ActionKind.AddToFavorite;
  payload: {
    book: IBook;
  };
};

export type Action =
  | SetFavorite
  | Loading
  | DeleteFromFavorite
  | AddToFavorite;