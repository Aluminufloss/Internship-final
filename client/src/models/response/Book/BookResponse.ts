import { IBook } from "./IBook";

export interface BookResponse {
  books: IBook[];
}

export interface SingleBookResponse {
  book: IBook;
}