import { IBook } from "./IBook";

export interface BookResponse {
  books: IBook[];
  accessToken?: string;
  refreshToken?: string;
}

export interface SingleBookResponse {
  title: string,
  author: string,
  date: string,
  description: string,
  genre: string,
  paperback: number,
  hardcover: number,
  amount: number,
  rating: number,
  price: number,
  imagePath: string,
  _id?: string,
}