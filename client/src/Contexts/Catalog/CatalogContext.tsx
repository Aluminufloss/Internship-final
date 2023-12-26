import { createContext, useContext, useReducer } from "react";

import { IBook } from "@/models/response/Book/IBook";

import { ActionKind } from "./ActionKind";

import { CatalogState } from "./CatalogType";
import { CatalogReducer } from "./CatalogReducer";

export type CatalogContextType = {
  catalogState: CatalogState;
  setCatalog: (catalog: IBook[]) => void;
  setSearchFilter: (filter: string) => void;
  sortByGenre: (genre: string) => void;
  sortByName: () => void;
  sortByAuthor: () => void;
  sortByRating: () => void;
  sortByDate: () => void;
  sortByPrice: () => void;
};

const initialState: CatalogContextType = {
  catalogState: {
    catalog: [],
    searchCatalog: [],
    isLoading: false,
  },
  setCatalog: () => null,
  setSearchFilter: () => null,
  sortByGenre: () => null,
  sortByName: () => null,
  sortByAuthor: () => null,
  sortByRating: () => null,
  sortByDate: () => null,
  sortByPrice: () => null,
};

const CatalogContext = createContext<CatalogContextType>(initialState);

type CatalogProviderType = {
  children?: React.ReactNode;
};

function CatalogProvider(
  { children }: CatalogProviderType,
  initialState: CatalogState
) {
  const [catalogState, dispatch] = useReducer(CatalogReducer, initialState);

  function setCatalog(catalog: IBook[]) {
    dispatch({ type: ActionKind.Loading });
    dispatch({ type: ActionKind.SetCatalog, payload: { catalog } });
  }

  function setSearchFilter(filter: string) {
    dispatch({ type: ActionKind.Loading });
    dispatch({ type: ActionKind.SetSearchFilter, payload: { filter } });
  }

  function sortByName() {
    dispatch({ type: ActionKind.SortByName, payload: { } });
  }

  function sortByAuthor() {
    dispatch({ type: ActionKind.SortByAuthor, payload: { } });
  }

  function sortByDate() {
    dispatch({ type: ActionKind.SortByDate, payload: { } });
  }

  function sortByPrice() {
    dispatch({ type: ActionKind.SortByPrice, payload: { } });
  }

  function sortByRating() {
    dispatch({ type: ActionKind.SortByRating, payload: { } });
  }

  function sortByGenre(genre: string) {
    dispatch({ type: ActionKind.SortByGenre, payload: { genre } });
  }

  return (
    <CatalogContext.Provider
      value={{
        catalogState,
        setSearchFilter,
        setCatalog,
        sortByName,
        sortByAuthor,
        sortByRating,
        sortByDate,
        sortByPrice,
        sortByGenre,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

function useCatalog() {
  const context = useContext(CatalogContext);
  return context;
}

export { CatalogProvider, useCatalog };
