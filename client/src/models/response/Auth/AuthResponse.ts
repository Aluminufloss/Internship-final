import { IUser } from "../Auth/IUser";

export interface AuthRespone {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}