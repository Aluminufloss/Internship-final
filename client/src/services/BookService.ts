import $api from "../axios/index";
import { AxiosResponse } from "axios";
import { BookResponse, SingleBookResponse } from "@/models/response/Book/BookResponse";

export default class BookService {
  static async getBooks(): Promise<AxiosResponse<BookResponse>> {
    return $api.get<BookResponse>("/getBooks");
  }

  static async getBook(_id: string): Promise<AxiosResponse<SingleBookResponse>> {
    return $api.post<SingleBookResponse>("/getBook", { _id });
  }
}