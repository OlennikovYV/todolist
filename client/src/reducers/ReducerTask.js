export const initialStateTask = {
  errorTask: null,
  loadingTask: false,
  prioritiesList: [],
  successTask: null,
  taskList: [],
};

export const ReducerTask = (state, action) => {
  switch (action.type) {
    case "GET_ALL_TASKS":
      return {
        ...state,
        successTask: action.payload.success,
        taskList: action.payload.taskList,
        messageTask: action.payload.messageTask,
      };
    case "ADD_TASK":
      return {
        ...state,
        successTask: action.payload.success,
        taskList: [...state.taskList, action.payload.record],
        messageTask: action.payload.messageTask,
      };
    case "UPDATE_TASK":
      return {
        ...state,
        successTask: action.payload.success,
        taskList: [...action.payload.taskList],
        messageTask: action.payload.messageTask,
      };
    case "SORT_UPDATE-AT":
      return {
        ...state,
        taskList: action.payload.taskList,
      };
    case "SORT_RESPONSIBLEID":
      return {
        ...state,
        taskList: action.payload.taskList,
      };
    case "GET_PRIORITIES":
      return {
        ...state,
        successTask: action.payload.success,
        prioritiesList: action.payload.prioritiesList,
        messageTask: action.payload.messageTask,
      };
    case "TASK_ERROR":
      return {
        ...state,
        errorTask: action.payload,
      };
    case "SET_STATUS_LOADING":
      return {
        ...state,
        loadingTask: action.payload.loadingTask,
      };
    default:
      return state;
  }
};
