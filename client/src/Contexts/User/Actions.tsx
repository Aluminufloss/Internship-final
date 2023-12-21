import { IUser } from "@/models/response/Auth/IUser";

import { ActionKind } from "./ActionKind";

type LoginAction = {
  type: ActionKind.Login;
  payload: IUser;
};

type RegistrationAction = {
  type: ActionKind.Registration;
  payload: IUser;
};

type LoginRejected = {
  type: ActionKind.LoginRejected;
  payload: string;
};

type SetUser = {
  type: ActionKind.SetUser;
  payload: {
    user: IUser;
    isAuth: boolean;
  };
};

type Loading = {
  type: ActionKind.Loading;
  payload?: string;
};

type ChangeInformation = {
  type: ActionKind.ChangeInformation;
  payload: {
    user: IUser;
  };
};

type UploadImage = {
  type: ActionKind.UploadImage;
  payload: {
    imagePath: string;
  };
};

type SetTokens = {
  type: ActionKind.SetTokens;
  payload: {
    accessToken: string,
    refreshToken: string,
  };
};

export type Action =
  | LoginAction
  | RegistrationAction
  | LoginRejected
  | SetUser
  | Loading
  | ChangeInformation
  | UploadImage
  | SetTokens;