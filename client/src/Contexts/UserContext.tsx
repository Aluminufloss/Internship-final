import { createContext, useContext, useReducer } from "react";

import { IUser } from "@/models/response/Auth/IUser";

import AuthService from "@/services/AuthService";

type AuthentificationState = {
  user: IUser;
  isLoading: boolean;
  isAuth: boolean;
  error: string;
};

enum ActionKind {
  Login = "user/login",
  LoginRejected = "user/rejected",
  GetMe = "user/getMe",
  SetUser = "user/setUser",
  Loading = "loading",
  Registration = "user/registration",
  ChangeInformation = "user/change",
  UploadImage = "user/upload",
}

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

type Action =
  | LoginAction
  | RegistrationAction
  | LoginRejected
  | SetUser
  | Loading
  | ChangeInformation
  | UploadImage;

export type UserContextType = {
  state: AuthentificationState;
  login: (email: string, password: string) => void;
  registration: (email: string, password: string, username: string) => void;
  setUser: (user: IUser, isAuth: boolean) => void;
  changeInformation: (
    user: IUser,
    newUsername: string,
    newEmail: string,
    newPassword: string
  ) => void;
  uploadImage: (image: string, id: string) => void;
};

const initialState: UserContextType = {
  state: {
    user: {
      id: "",
      email: "",
      username: "",
      imagePath: "",
    },
    isLoading: false,
    isAuth: false,
    error: "",
  },
  login: () => null,
  registration: () => null,
  setUser: () => null,
  changeInformation: () => null,
  uploadImage: () => null,
};

const UserContext = createContext<UserContextType>(initialState);

function userReducer(
  state: AuthentificationState,
  action: Action
): AuthentificationState {
  switch (action.type) {
    case ActionKind.Login: {
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload,
      };
    }

    case ActionKind.LoginRejected: {
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        error: action.payload as string,
      };
    }

    case ActionKind.SetUser: {
      return {
        ...state,
        isAuth: action.payload.isAuth,
        isLoading: false,
        user: action.payload.user,
      };
    }

    case ActionKind.Registration: {
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload,
      };
    }

    case ActionKind.Loading: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ActionKind.ChangeInformation: {
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
        isLoading: true,
      };
    }

    default:
      return state;
  }
}

type UserProviderType = {
  children?: React.ReactNode;
};

function UserProvider(
  { children }: UserProviderType,
  initialState: AuthentificationState
) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  async function login(email: string, password: string) {
    dispatch({ type: ActionKind.Loading });

    try {
      const response = await AuthService.login(email, password);

      dispatch({ type: ActionKind.Login, payload: response.data.user });
    } catch (err) {
      console.log("Something wrong");
      throw err;
    }
  }

  async function registration(
    email: string,
    password: string,
    username: string
  ) {
    dispatch({ type: ActionKind.Loading });
    try {
      const response = await AuthService.registration(
        email,
        password,
        username
      );

      dispatch({ type: ActionKind.Registration, payload: response.data.user });
    } catch (err) {
      console.log("Something wrong");
    }
  }

  async function setUser(user: IUser, isAuth: boolean) {
    dispatch({ type: ActionKind.Loading });
    try {
      dispatch({ type: ActionKind.SetUser, payload: { user, isAuth } });
    } catch (err) {
      console.log("Something wrong");
    }
  }

  async function uploadImage(id: string, image: string) {
    dispatch({ type: ActionKind.Loading });
    try {
      const response = await AuthService.uploadImage(id, image);
      dispatch({ type: ActionKind.UploadImage, payload: { imagePath: response.data.imagePath! } });
    } catch (err) {
      console.log("Something wrong");
    }
  }

  async function changeInformation(
    user: IUser,
    newUsername: string,
    newEmail: string,
    newPassword: string
  ) {
    dispatch({ type: ActionKind.Loading });
    try {
      const response = await AuthService.changeInformation(
        user,
        newUsername,
        newEmail,
        newPassword,
      );

      dispatch({ type: ActionKind.ChangeInformation, payload: { user: response.data.user } });
    } catch (err) {
      console.log("Something wrong with changing your personal information");
      throw err;
    }
  }

  return (
    <UserContext.Provider
      value={{
        state,
        login,
        registration,
        setUser,
        changeInformation,
        uploadImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useAuth() {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, useAuth };
