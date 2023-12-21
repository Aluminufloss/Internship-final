import { ActionKind } from "./ActionKind";

import { Action } from "./Actions";

import { AuthentificationState } from "./UserType"; 

export function userReducer(
  userState: AuthentificationState,
  action: Action
): AuthentificationState {
  switch (action.type) {
    case ActionKind.Login: {
      return {
        ...userState,
        isAuth: true,
        isLoading: false,
        user: action.payload,
      };
    }

    case ActionKind.LoginRejected: {
      return {
        ...userState,
        isAuth: false,
        isLoading: false,
        error: action.payload as string,
      };
    }

    case ActionKind.SetUser: {
      return {
        ...userState,
        isAuth: action.payload.isAuth,
        isLoading: false,
        user: action.payload.user,
      };
    }

    case ActionKind.Registration: {
      return {
        ...userState,
        isAuth: true,
        isLoading: false,
        user: action.payload,
      };
    }

    case ActionKind.Loading: {
      return {
        ...userState,
        isLoading: true,
      };
    }

    case ActionKind.ChangeInformation: {
      return {
        ...userState,
        user: action.payload.user,
        isAuth: true,
        isLoading: true,
      };
    }

    case ActionKind.UploadImage: {
      return {
        ...userState,
        user: {
          email: userState.user.email,
          imagePath: action.payload.imagePath,
        },
      };
    }
    
    case ActionKind.SetTokens: {
      return {
        ...userState,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }

    default:
      return userState;
  }
}