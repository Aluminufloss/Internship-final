import { IBook } from "@/models/response/Book/IBook";

export type FavoriteState = {
  favorite: IBook[];
  isLoading: boolean;
};