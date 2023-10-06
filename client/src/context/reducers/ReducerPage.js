import { SET_CURRENT_PAGE, SET_LIMIT_PAGE, SET_TOTAL_PAGE } from "../constants";

export const initialStatePage = {
  currentPage: 1,
  limitPage: 10,
  totalPage: 0,
};

export const ReducerPage = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    case SET_LIMIT_PAGE:
      return {
        ...state,
        limitPage: action.payload.limitPage,
      };
    case SET_TOTAL_PAGE:
      return {
        ...state,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};
