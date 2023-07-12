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
        messageTask: action.payload.message,
      };
    case "ADD_TASK":
      return {
        ...state,
        successTask: action.payload.success,
        taskList: [...state.tasks, action.payload.record],
        messageTask: action.payload.message,
      };
    case "UPDATE_TASK":
      return {
        ...state,
        successTask: action.payload.success,
        taskList: [...action.payload.taskList],
        messageTask: action.payload.message,
      };
    case "SORT_UPDATE-AT":
      return {
        ...state,
        taskList: action.payload.tasks,
      };
    case "GET_PRIORITIES":
      return {
        ...state,
        successTask: action.payload.success,
        prioritiesList: action.payload.prioritiesList,
        messageTask: action.payload.message,
      };
    case "SORT_RESPONSIBLEID":
      return {
        ...state,
        taskList: action.payload,
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
