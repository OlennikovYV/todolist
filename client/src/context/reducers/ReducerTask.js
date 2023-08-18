import {
  GET_ALL_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  SET_DISPLAY_PERIOD,
  SET_SORT_FIELD_NAME,
  GET_PRIORITIES,
  ERROR,
  SET_STATUS_LOADING,
} from "../constants";

export const initialStateTask = {
  displayPeriodName: "all",
  errorTask: null,
  loadingTask: false,
  prioritiesList: [],
  sortFieldName: "id",
  sortOrder: "ASC",
  successTask: null,
  taskList: [],
};

export const ReducerTask = (state, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        successTask: action.payload.success,
        taskList: action.payload.taskList,
        messageTask: action.payload.messageTask,
      };
    case ADD_TASK:
      return {
        ...state,
        successTask: action.payload.success,
        taskList: [...state.taskList, action.payload.record],
        messageTask: action.payload.messageTask,
      };
    case UPDATE_TASK:
      return {
        ...state,
        successTask: action.payload.success,
        taskList: [...action.payload.taskList],
        messageTask: action.payload.messageTask,
      };
    case SET_DISPLAY_PERIOD:
      return {
        ...state,
        displayPeriodName: action.payload.displayPeriodName,
      };
    case SET_SORT_FIELD_NAME:
      return {
        ...state,
        sortFieldName: action.payload.sortFieldName,
        sortOrder: action.payload.sortOrder,
      };
    case GET_PRIORITIES:
      return {
        ...state,
        successTask: action.payload.success,
        prioritiesList: action.payload.prioritiesList,
        messageTask: action.payload.messageTask,
      };
    case ERROR:
      return {
        ...state,
        errorTask: action.payload,
      };
    case SET_STATUS_LOADING:
      return {
        ...state,
        loadingTask: action.payload.loadingTask,
      };
    default:
      return state;
  }
};
