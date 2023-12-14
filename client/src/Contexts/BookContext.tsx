import { IBook } from "@/models/response/Book/IBook";
import BookService from "@/services/BookService";
import { createContext, useContext, useReducer } from "react";

type BookState = {
  books: IBook[];
  isLoading: boolean;
};

enum ActionKind {
  SetBooks = "book/getBooks",
  Loading = "book/loading"
}

type SetBooksAction = {
  type: ActionKind.SetBooks;
  payload: IBook[];
};

type Loading = {
  type: ActionKind.Loading;
  payload?: string;
};

type Action = SetBooksAction | Loading;

export type BookContextType = {
  state: BookState;
  setBooks: (books: IBook[]) => void;
}

const initialState: BookContextType = {
  state: {
    books: [],
    isLoading: false,
  },
  setBooks: () => null,
}

const BookContext = createContext<BookContextType>(initialState);

function bookReducer(
  state: BookState,
  action: Action
): BookState {
  switch (action.type) {
    case ActionKind.SetBooks: {
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

  async function setBooks(books: IBook[]) {
    dispatch({ type: ActionKind.Loading });

    try {
      dispatch({ type: ActionKind.SetBooks, payload: books });
    } catch (err) {
      console.log("Something wrong with getting books");
    }
  }

  return (
    <BookContext.Provider
      value={{
        state,
        setBooks,
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

export { BookProvider, useBook };