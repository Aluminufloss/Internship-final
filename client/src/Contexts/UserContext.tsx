import { createContext, useContext, useReducer, useState } from "react";

import { IUser } from "@/models/response/Auth/IUser";

import AuthService from "@/services/AuthService";

type AuthentificationState = {
  user: IUser | string;
  isLoading: boolean;
  isAuth: boolean;
  error: string;
};

enum ActionKind {
  Login = "user/login",
  LoginRejected = "user/rejected",
  GetMe = "user/getMe",
  Loading = "loading",
  Registration = "user/registration",
}

type PayloadKind = IUser | string;

type Action = {
  type: ActionKind;
  payload: PayloadKind;
};

export type UserContextType = {
  state: AuthentificationState;
  login: (email: string, password: string) => void;
  registration: (email: string, password: string) => void;
  getMe: () => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

const initialState = {
  user: {
    id: "",
    email: "User",
  },
  isLoading: false,
  isAuth: false,
  error: "",
};

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

    case ActionKind.GetMe: {
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload,
      }
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

    default:
      throw new Error("Unknown action type");
  }
}

type UserProviderType = {
  children?: React.ReactNode;
};

function UserProvider({ children }: UserProviderType) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  async function login(email: string, password: string) {
    dispatch({ type: ActionKind.Loading, payload: email });

    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);

      dispatch({ type: ActionKind.Login, payload: response.data.user });
    } catch (err) {
      console.log("Something wrong");
    }
  }

  async function registration(email: string, password: string) {
    dispatch({ type: ActionKind.Loading, payload: "" });
    try {
      const response = await AuthService.registration(email, password);

      dispatch({ type: ActionKind.Registration, payload: response.data.user });
    } catch (err) {
      console.log("Something wrong");
    }
  }

  async function getMe() {
    dispatch({ type: ActionKind.Loading, payload: "" });
    try {
      const response = await AuthService.getMe();

      dispatch({ type: ActionKind.GetMe, payload: response.data.user });
    } catch (err) {
      console.log("Something wrong");
    }
  }

  return (
    <UserContext.Provider
      value={{
        state,
        login,
        registration,
        getMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function Auth() {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, Auth };
