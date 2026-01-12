import { type } from "./Action.type";

// Initial state
export const initialState = {
  basket: [],
  user: null,
  searchTerm: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_CART: {
      const existingIndex = state.basket.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        // Item exists, increase quantity
        const newBasket = [...state.basket];
        newBasket[existingIndex].quantity += 1;
        return { ...state, basket: newBasket };
      } else {
        // New item, set quantity to 1
        return {
          ...state,
          basket: [...state.basket, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case type.REMOVE_FROM_CART: {
      const newBasket = [...state.basket];
      newBasket.splice(action.payload, 1);
      return { ...state, basket: newBasket };
    }

    case type.UPDATE_QUANTITY: {
      const { index, quantity } = action.payload;
      const newBasket = [...state.basket];
      if (newBasket[index]) {
        newBasket[index].quantity = quantity;
      }
      return { ...state, basket: newBasket };
    }

    case type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    case type.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    default:
      return state;
  }
};
