import { IUser } from "../Auth/IUser";

export interface AuthRespone {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface UploadImageRespone {
  imagePath: string;
}