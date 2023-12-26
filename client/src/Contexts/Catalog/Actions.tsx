import { IBook } from "@/models/response/Book/IBook";
import { ActionKind } from "./ActionKind";

type SetCatalog = {
  type: ActionKind.SetCatalog;
  payload: {
    catalog: IBook[];
  };
};

type SetSearchFilter = {
  type: ActionKind.SetSearchFilter;
  payload: {
    filter: string;
  };
};

type SortByName = {
  type: ActionKind.SortByName;
  payload: { };
};

type SortByDate = {
  type: ActionKind.SortByDate;
  payload: { };
};

type SortByAuthor = {
  type: ActionKind.SortByAuthor;
  payload: { };
};

type SortByPrice = {
  type: ActionKind.SortByPrice;
  payload: { };
};

type SortByRating = {
  type: ActionKind.SortByRating;
  payload: { };
};

type SortByGenre = {
  type: ActionKind.SortByGenre;
  payload: { genre: string };
};

type Loading = {
  type: ActionKind.Loading;
  payload?: string;
};

export type Action =
  | SetCatalog
  | SetSearchFilter
  | SortByDate
  | SortByName
  | SortByAuthor
  | SortByPrice
  | SortByRating
  | SortByGenre
  | Loading;