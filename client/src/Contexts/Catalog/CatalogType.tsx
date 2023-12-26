import { IBook } from "@/models/response/Book/IBook";

export type CatalogState = {
  catalog: IBook[];
  searchCatalog: IBook[],
  isLoading: boolean;
};