export const initialStateTask = {
  error: null,
  loading: false,
  priorities: [],
  success: null,
  tasks: [],
};

export const ReducerTask = (state, action) => {
  switch (action.type) {
    case "GET_ALL_TASKS":
      return {
        ...state,
        success: action.payload.success,
        tasks: action.payload.taskList,
        message: action.payload.message,
      };
    case "ADD_TASK":
      return {
        ...state,
        success: action.payload.success,
        tasks: [...state.tasks, action.payload],
        message: action.payload.message,
      };
    case "UPDATE_TASK":
      return {
        ...state,
        success: action.payload.success,
        tasks: [...action.payload],
        message: action.payload.message,
      };
    case "SORT_UPDATE-AT":
      return {
        ...state,
        tasks: action.payload,
      };
    case "GET_PRIORITIES":
      return {
        ...state,
        success: action.payload.success,
        priorities: action.payload.prioritiesList,
        message: action.payload.message,
      };
    case "SORT_RESPONSIBLEID":
      return {
        ...state,
        tasks: action.payload,
      };
    case "TASK_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_STATUS_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
