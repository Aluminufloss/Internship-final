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
        ...catalogState,
        isLoading: false,
        searchCatalog: action.payload.catalog,
        catalog: action.payload.catalog,
      };
    }

    case ActionKind.SetSearchFilter: {
      return {
        ...catalogState,
        isLoading: false,
        searchCatalog: [...catalogState.catalog].filter(
          (el) =>
            el.title
              .toLowerCase()
              .includes(action.payload.filter.toLowerCase()) ||
            el.author
              .toLowerCase()
              .includes(action.payload.filter.toLowerCase())
        ),
      };
    }

    case ActionKind.SortByGenre: {
      if (action.payload.genre === 'Genre') {
        return {
          ...catalogState,
          searchCatalog: [...catalogState.catalog],
        };
      } else {
        return {
          ...catalogState,
          isLoading: false,
          searchCatalog: [...catalogState.catalog].filter((el) => el.genre === action.payload.genre),
        };
      }
    }

    case ActionKind.SortByAuthor: {
      return {
        ...catalogState,
        isLoading: false,
        searchCatalog: [...catalogState.searchCatalog].sort((a, b) =>
          a.author.localeCompare(b.author)
        ),
      };
    }

    case ActionKind.SortByName: {
    //   const sortedSearchCatalog = [...catalogState.searchCatalog].sort((a, b) =>
    //   a.title.localeCompare(b.title)
    // );
  
    //   console.log('Before sorting:', catalogState.searchCatalog);
    //   console.log('After sorting:', sortedSearchCatalog);
      return {
        ...catalogState,
        isLoading: false,
        searchCatalog: [...catalogState.searchCatalog].sort((a, b) =>
          a.title.localeCompare(b.title)
        ),
      };
    }

    case ActionKind.SortByRating: {
      return {
        ...catalogState,
        isLoading: false,
        searchCatalog: [...catalogState.searchCatalog].sort((a, b) =>
          a.rating > b.rating ? -1 : 1
        ),
      };
    }

    case ActionKind.SortByPrice: {
      return {
        ...catalogState,
        isLoading: false,
        searchCatalog: [...catalogState.searchCatalog].sort((a, b) =>
          a.price > b.price ? -1 : 1
        ),
      };
    }

    case ActionKind.SortByDate: {
      return {
        ...catalogState,
        isLoading: false,
        searchCatalog: [...catalogState.searchCatalog].sort((a, b) =>
          a.date > b.date ? 1 : -1
        ),
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
