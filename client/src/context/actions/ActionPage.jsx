import { useReducer } from "react";

import { initialStatePage, ReducerPage } from "../reducers/ReducerPage";

import { SET_CURRENT_PAGE, SET_LIMIT_PAGE, SET_TOTAL_PAGE } from "../constants";

const ActionPage = () => {
  const [state, dispatch] = useReducer(ReducerPage, initialStatePage);

  function setCurrentPage(page) {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: { currentPage: page },
    });
  }
  function setLimitPage(count) {
    dispatch({
      type: SET_LIMIT_PAGE,
      payload: { limitPage: count },
    });
  }
  function setTotalPage(page) {
    dispatch({
      type: SET_TOTAL_PAGE,
      payload: { currentPage: page },
    });
  }

  return {
    currentPage: state.currentPage,
    limitPage: state.limitPage,
    totalPage: state.totalPage,
    setCurrentPage,
    setLimitPage,
    setTotalPage,
  };
};

export default ActionPage;
