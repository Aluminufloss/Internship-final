import { IBook } from "./IBook";

export interface BookResponse {
  books: IBook[];
  accessToken?: string;
  refreshToken?: string;
}

export interface SingleBookResponse {
  book: IBook;
}