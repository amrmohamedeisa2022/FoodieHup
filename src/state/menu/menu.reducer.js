

import {
  GET_MENU_ITEMS_REQUEST,
  GET_MENU_ITEMS_REQUEST_SUCCESS,
  GET_MENU_ITEMS_REQUEST_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  CREATE_MENU_ITEM_FAILURE,
} from "./menu.action";

const initialState = {
  loading: false,
  error: null,
  menuItems: [],
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU_ITEMS_REQUEST:
    case DELETE_MENU_ITEM_REQUEST:
    case CREATE_MENU_ITEM_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_MENU_ITEMS_REQUEST_SUCCESS:
      return { ...state, loading: false, menuItems: action.payload };

    case DELETE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: state.menuItems.filter((item) => item.id !== action.payload),
      };

    case CREATE_MENU_ITEM_SUCCESS:
      
      return {
        ...state,
        loading: false,
        menuItems: [action.payload, ...state.menuItems],
      };

    case GET_MENU_ITEMS_REQUEST_FAILURE:
    case DELETE_MENU_ITEM_FAILURE:
    case CREATE_MENU_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
