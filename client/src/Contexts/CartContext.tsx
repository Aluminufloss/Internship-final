import { IBook } from "@/models/response/Book/IBook";
import BookService from "@/services/BookService";
import { createContext, useContext, useReducer } from "react";

type BookState = {
  books: IBook[];
  isLoading: boolean;
};

enum ActionKind {
  GetBooks = "book/getBooks",
  Loading = "book/loading"
}

type GetBooksAction = {
  type: ActionKind.GetBooks;
  payload: IBook[];
};

type Loading = {
  type: ActionKind.Loading;
  payload?: string;
};

type Action = GetBooksAction | Loading;

export type BookContextType = {
  state: BookState;
  getBooks: () => void;
}

const initialState: BookContextType = {
  state: {
    books: [],
    isLoading: false,
  },
  getBooks: () => null,
}

const BookContext = createContext<BookContextType>(initialState);

function bookReducer(
  state: BookState,
  action: Action
): BookState {
  switch (action.type) {
    case ActionKind.GetBooks: {
      return {
        ...state,
        books: action.payload,
      };
    }

    case ActionKind.Loading: {
      return {
        ...state,
        isLoading: true,
      };
    }
  }
}

type BookProviderType = {
  children?: React.ReactNode;
}

function BookProvider(
  { children }: BookProviderType,
  initialState: BookState,
) {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  async function getBooks() {
    dispatch({ type: ActionKind.Loading });

    try {
      const response = await BookService.getBooks();
      dispatch({ type: ActionKind.GetBooks, payload: response.data.books });
    } catch (err) {
      console.log("Something wrong with getting books");
    }
  }

  return (
    <BookContext.Provider
      value={{
        state,
        getBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}

function useBook() {
  const context = useContext(BookContext);
  return context;
}
