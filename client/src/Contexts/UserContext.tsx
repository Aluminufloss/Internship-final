import { createContext, useContext, useReducer } from "react";

import { IUser } from "@/models/response/Auth/IUser";

import AuthService from "@/services/AuthService";
import { IBook } from "@/models/response/Book/IBook";

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
  SetCart = "user/setCart",
  DeleteFromCart = "user/deleteFromCart",
  Loading = "loading",
  Registration = "user/registration",
  ChangeInformation = "user/change",
  UploadImage = "user/upload",
  AddFavorite = "user/favorite",
  DeleteFavorite = "user/delete",
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

type SetCart = {
  type: ActionKind.SetCart;
  payload: {
    cart: IBook[];
  };
};

type DeleteFromCart = {
  type: ActionKind.DeleteFromCart;
  payload: {
    bookID: string;
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

type AddFavorite = {
  type: ActionKind.AddFavorite;
  payload: {
    bookID: string;
  };
};

type DeleteFavorite = {
  type: ActionKind.DeleteFavorite;
  payload: {
    bookID: string;
  };
};

type Action =
  | LoginAction
  | RegistrationAction
  | LoginRejected
  | SetUser
  | SetCart
  | Loading
  | ChangeInformation
  | UploadImage
  | AddFavorite
  | DeleteFavorite
  | DeleteFromCart;

export type UserContextType = {
  state: AuthentificationState;
  login: (email: string, password: string) => void;
  registration: (email: string, password: string, username: string) => void;
  setUser: (user: IUser, isAuth: boolean) => void;
  setCart: (cart: IBook[]) => void;
  changeInformation: (
    user: IUser,
    newUsername: string,
    newEmail: string,
    newPassword: string
  ) => void;
  uploadImage: (image: string, id: string) => void;
  addFavorite: (bookID: string, accessToken: string) => void;
  deleteFavorite: (bookID: string, accessToken: string) => void;
  deleteFromCart: (bookID: string, accessToken: string, refreshToken: string) => void;
};

const initialState: UserContextType = {
  state: {
    user: {
      id: "",
      email: "",
      username: "",
      imagePath: "",
      cart: [],
      favoriteBooks: [],
    },
    isLoading: false,
    isAuth: false,
    error: "",
  },
  login: () => null,
  registration: () => null,
  setUser: () => null,
  setCart: () => null,
  changeInformation: () => null,
  uploadImage: () => null,
  addFavorite: () => null,
  deleteFromCart: () => null,
  deleteFavorite: () => null,
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

    case ActionKind.SetCart: {
      return {
        ...state,
        user: {
          email: state.user.email,
          favoriteBooks: state.user.favoriteBooks,
          cart: action.payload.cart,
          imagePath: state.user.imagePath,
        },
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

    case ActionKind.UploadImage: {
      return {
        ...state,
        user: {
          email: state.user.email,
          favoriteBooks: state.user.favoriteBooks,
          cart: state.user.cart,
          imagePath: action.payload.imagePath,
        },
      };
    }

    case ActionKind.AddFavorite: {
      return {
        ...state,
        user: {
          email: state.user.email,
          favoriteBooks: [...state.user.favoriteBooks, action.payload.bookID],
          cart: state.user.cart,
        },
      };
    }

    case ActionKind.DeleteFavorite: {
      return {
        ...state,
        user: {
          email: state.user.email,
          favoriteBooks: [...state.user.favoriteBooks].filter(
            (el) => el !== action.payload.bookID
          ),
          cart: state.user.cart,
        },
      };
    }

    case ActionKind.DeleteFromCart: {
      return {
        ...state,
        user: {
          email: state.user.email,
          cart: [...state.user.cart].filter(
            (el) => el._id !== action.payload.bookID
          ),
          favoriteBooks: state.user.favoriteBooks,
        },
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

  async function setCart(cart: IBook[]) {
    dispatch({ type: ActionKind.Loading });
    try {
      dispatch({ type: ActionKind.SetCart, payload: { cart } });
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

  async function addFavorite(bookID: string, accessToken: string) {
    dispatch({ type: ActionKind.Loading });
    try {
      await AuthService.addFavoriteBook(bookID, accessToken);

      dispatch({ type: ActionKind.AddFavorite, payload: { bookID } });
    } catch (err) {
      console.log("Something wrong with changing your personal information");
      throw err;
    }
  }

  async function deleteFavorite(bookID: string, accessToken: string) {
    dispatch({ type: ActionKind.Loading });
    try {
      await AuthService.deleteFavoriteBook(bookID, accessToken);

      dispatch({ type: ActionKind.DeleteFavorite, payload: { bookID } });
    } catch (err) {
      console.log("Something wrong with changing your personal information");
      throw err;
    }
  }

  async function deleteFromCart(bookID: string, accessToken: string, refreshToken: string) {
    dispatch({ type: ActionKind.Loading });
    try {
      await AuthService.deleteFromCart(bookID, accessToken, refreshToken);

      dispatch({ type: ActionKind.DeleteFromCart, payload: { bookID } });
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
        setCart,
        deleteFromCart,
        changeInformation,
        uploadImage,
        addFavorite,
        deleteFavorite,
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
