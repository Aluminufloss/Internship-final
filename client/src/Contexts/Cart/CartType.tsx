import { IBook } from "@/models/response/Book/IBook";

export type CartState = {
  cart: IBook[];
  isLoading: boolean;
};