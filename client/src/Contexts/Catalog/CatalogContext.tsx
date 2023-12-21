import { createContext, useContext, useReducer } from "react";

import { IBook } from "@/models/response/Book/IBook";

import { ActionKind } from "./ActionKind";

import { CatalogState } from "./CatalogType";
import { CatalogReducer } from "./CatalogReducer";

export type CatalogContextType = {
  catalogState: CatalogState;
  setCatalog: (catalog: IBook[]) => void;
};

const initialState: CatalogContextType = {
  catalogState: {
    catalog: [],
    isLoading: false,
  },
  setCatalog: () => null,
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

  return (
    <CatalogContext.Provider
      value={{
        catalogState,
        setCatalog,
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
