import { IUser } from "@/models/response/Auth/IUser";

export type AuthentificationState = {
  user: IUser;
  isLoading: boolean;
  isAuth: boolean;
  error: string;
  accessToken?: string;
  refreshToken?: string;
};