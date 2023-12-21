import { IBook } from "@/models/response/Book/IBook";
import { ActionKind } from "./ActionKind";

type SetCatalog = {
  type: ActionKind.SetCatalog;
  payload: {
    catalog: IBook[];
  };
};

type Loading = {
  type: ActionKind.Loading;
  payload?: string;
};

export type Action =
  | SetCatalog
  | Loading;