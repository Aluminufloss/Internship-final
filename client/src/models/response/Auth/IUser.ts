import { IBook } from "../Book/IBook";

export interface IUser {
  email: string;
  id?: string;
  username?: string;
  imagePath?: string;
  favoriteBooks: string[];
  cart: IBook[];
}