import { createContext, useContext, useReducer } from "react";

import { IUser } from "@/models/response/Auth/IUser";

import AuthService from "@/services/AuthService";

import { ActionKind } from "./ActionKind";

import { userReducer } from "./UserReducer";

import { AuthentificationState } from "./UserType";

export type UserContextType = {
  userState: AuthentificationState;
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
  setTokens: (accessToken: string, refreshToken: string) => void;
};

const initialState: UserContextType = {
  userState: {
    user: {
      id: "",
      email: "",
      username: "",
      imagePath: "",
    },
    isLoading: false,
    isAuth: false,
    error: "",
    accessToken: "",
    refreshToken: "",
  },
  login: () => null,
  registration: () => null,
  setUser: () => null,
  changeInformation: () => null,
  uploadImage: () => null,
  setTokens: () => null,
};

const UserContext = createContext<UserContextType>(initialState);

type InitialPropsType = {
  user: IUser,
  isAuth: boolean,
  accessToken?: string,
  refreshToken?: string,
}

type UserProviderType = {
  children?: React.ReactNode;
  initialState: InitialPropsType;
};


const getInitialState = (params: InitialPropsType):AuthentificationState => {
  return {
    isLoading: true,
    error: "",
    ...params,
  }
}

const UserProvider: React.FC<UserProviderType> = (props) => {
  const [userState, dispatch] = useReducer(userReducer, props.initialState, getInitialState);

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
      dispatch({
        type: ActionKind.UploadImage,
        payload: { imagePath: response.data.imagePath! },
      });
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
        newPassword
      );

      dispatch({
        type: ActionKind.ChangeInformation,
        payload: { user: response.data.user },
      });
    } catch (err) {
      console.log("Something wrong with changing your personal information");
      throw err;
    }
  }

  async function setTokens(accessToken: string, refreshToken: string) {
    dispatch({ type: ActionKind.Loading });
    try {
      dispatch({ type: ActionKind.SetTokens, payload: { accessToken, refreshToken } });
    } catch (err) {
      console.log("Something wrong with changing your personal information");
      throw err;
    }
  }

  return (
    <UserContext.Provider
      value={{
        userState,
        login,
        registration,
        setUser,
        changeInformation,
        uploadImage,
        setTokens,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

function useAuth() {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, useAuth };
