import $api from "../axios/index";
import { AxiosResponse } from "axios";
import { AuthRespone } from "../models/response/Auth/AuthResponse";
import { IUser } from "@/models/response/Auth/IUser";

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
}
