import { ActionKind } from "./ActionKind";
import { Action } from "./Actions";
import { FavoriteState } from "./FavoriteType";

export function favoriteReducer(
  favoriteState: FavoriteState,
  action: Action
): FavoriteState {
  switch (action.type) {
    case ActionKind.SetFavorite: {
      return {
        ...favoriteState,
        favorite: action.payload.favorite
      };
    }

    case ActionKind.DeleteFromFavorite: {
      return {
        ...favoriteState,
        favorite: [...favoriteState.favorite].filter(
          (el) => el._id !== action.payload.bookID
        ),
      };
    }

    case ActionKind.AddToFavorite: {
      return {
        ...favoriteState,
        favorite: [...favoriteState.favorite, action.payload.book],
      }
    }

    case ActionKind.Loading: {
      return {
        ...favoriteState,
        isLoading: true,
      };
    }

    default:
      return favoriteState;
  }
}