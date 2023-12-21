import { ActionKind } from "./ActionKind";
import { Action } from "./Actions";
import { CatalogState } from "./CatalogType";

export function CatalogReducer(
  catalogState: CatalogState,
  action: Action
): CatalogState {
  switch (action.type) {
    case ActionKind.SetCatalog: {
      return {
        isLoading: false,
        catalog: action.payload.catalog
      };
    }

    case ActionKind.Loading: {
      return {
        ...catalogState,
        isLoading: true,
      };
    }

    default:
      return catalogState;
  }
}