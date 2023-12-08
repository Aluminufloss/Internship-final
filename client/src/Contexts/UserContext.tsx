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
}

type PayloadKind = {
  user?: IUser;
  error?: string;
  email?: string;
  isAuth?: boolean;
};

// type Action = {
//   type: ActionKind;
//   payload?: PayloadKind;
// };

//---------------------------------------//
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

type Action =
  | LoginAction
  | RegistrationAction
  | LoginRejected
  | SetUser
  | Loading;
//---------------------------------------//

export type UserContextType = {
  state: AuthentificationState;
  login: (email: string, password: string) => void;
  registration: (email: string, password: string) => void;
  getMe: () => void;
  setUser: (user: IUser, isAuth: boolean) => void;
};

const initialState: UserContextType = {
  state: {
    user: {
      id: "",
      email: "",
    },
    isLoading: false,
    isAuth: false,
    error: "",
  },
  login: () => null,
  registration: () => null,
  getMe: () => null,
  setUser: () => null,
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

    // case ActionKind.GetMe: {
    //   return {
    //     ...state,
    //     isAuth: true,
    //     isLoading: false,
    //     user: action.payload as IUser,
    //   };
    // }

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
    }
  }

  async function registration(email: string, password: string) {
    dispatch({ type: ActionKind.Loading });
    try {
      const response = await AuthService.registration(email, password);

      dispatch({ type: ActionKind.Registration, payload: response.data.user });
    } catch (err) {
      console.log("Something wrong");
    }
  }

  async function getMe() {
    dispatch({ type: ActionKind.Loading });
    try {
      // const response = await AuthService.getMe();

      // dispatch({ type: ActionKind.GetMe, payload: response.data.user });
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

  return (
    <UserContext.Provider
      value={{
        state,
        login,
        registration,
        getMe,
        setUser,
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
