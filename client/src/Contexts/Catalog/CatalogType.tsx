import { IBook } from "@/models/response/Book/IBook";

export type CatalogState = {
  catalog: IBook[];
  isLoading: boolean;
};