import { ActionKind } from "./ActionKind";
import { Action } from "./Actions";
import { CartState } from "./CartType";

export function cartReducer(
  cartState: CartState,
  action: Action
): CartState {
  switch (action.type) {
    case ActionKind.SetCart: {
      return {
        ...cartState,
        cart: action.payload.cart
      };
    }

    case ActionKind.DeleteFromCart: {
      return {
        ...cartState,
        cart: [...cartState.cart].filter(
          (el) => el._id !== action.payload.bookID
        ),
      };
    }

    case ActionKind.AddToCart: {
      return {
        ...cartState,
        cart: [...cartState.cart, action.payload.book],
      }
    }

    case ActionKind.Loading: {
      return {
        ...cartState,
        isLoading: true,
      };
    }

    default:
      return cartState;
  }
}