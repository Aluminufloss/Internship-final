import $api from "../axios/index";
import { AxiosResponse } from "axios";
import { AuthRespone, UploadImageRespone } from "../models/response/Auth/AuthResponse";
import { IUser } from "@/models/response/Auth/IUser";
import { BookResponse } from "@/models/response/Book/BookResponse";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthRespone>> {
    return $api.post<AuthRespone>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
    username: string
  ): Promise<AxiosResponse<AuthRespone>> {
    return $api.post<AuthRespone>("/registration", {
      email,
      password,
      username,
    });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }

  static async getMe(
    refreshToken: string,
    accessToken: string
  ): Promise<AxiosResponse<AuthRespone>> {
    return $api.post("/getMe", { refreshToken, accessToken });
  }

  static async refresh(): Promise<AxiosResponse<AuthRespone>> {
    return $api.get("/refresh");
  }

  static async changeInformation(
    user: IUser,
    newUsername: string,
    newEmail: string,
    newPassword: string
  ): Promise<AxiosResponse<AuthRespone>> {
    return $api.post("/change", { user, newUsername, newEmail, newPassword });
  }

  static async uploadImage(id: string, image: string): Promise<AxiosResponse<UploadImageRespone>> {
    return $api.post("/upload", { id, image });
  }

  static async getFavoriteBooks(accessToken: string, refreshToken: string): Promise<AxiosResponse<BookResponse>> {
    return $api.post("/favorite", { accessToken, refreshToken });
  }

  static async addFavoriteBook(bookID: string, accessToken: string): Promise<AxiosResponse<BookResponse>> {
    return $api.post("/favoriteAdd", { bookID, accessToken });
  }

  static async deleteFavoriteBook(bookID: string, accessToken: string): Promise<AxiosResponse<BookResponse>> {
    return $api.post("/favoriteDelete", { bookID, accessToken });
  }

  static async createComment(bookID: string, text: string, accessToken: string): Promise<AxiosResponse<UploadImageRespone>> {
    return $api.post("/commentCreate", { bookID, text, accessToken });
  }

  static async getCart(accessToken: string, refreshToken: string): Promise<AxiosResponse<BookResponse>> {
    return $api.post("/cart", { accessToken, refreshToken });
  }

  static async deleteFromCart(bookID: string, accessToken: string, refreshToken: string): Promise<AxiosResponse<BookResponse>> {
    return $api.post("/cartDelete", { bookID, accessToken, refreshToken });
  }

}
