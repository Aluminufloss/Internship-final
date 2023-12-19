import $api from "../axios/index";
import { AxiosResponse } from "axios";
import { BookResponse, SingleBookResponse } from "@/models/response/Book/BookResponse";
import { CommentResponse } from "@/models/response/Comment/CommentResponse";

export default class BookService {
  static async getBooks(): Promise<AxiosResponse<BookResponse>> {
    return $api.get<BookResponse>("/getBooks");
  }

  static async getBook(_id: string): Promise<AxiosResponse<SingleBookResponse>> {
    return $api.post<SingleBookResponse>("/getBook", { _id });
  }

  static async getComments(bookID: string, accessToken: string): Promise<AxiosResponse<CommentResponse>> {
    return $api.post<CommentResponse>("/comments", { bookID, accessToken });
  }
}