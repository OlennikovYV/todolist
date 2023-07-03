export const initialStateTask = {
  tasks: [],
  priorities: [],
  error: null,
  success: null,
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
    default:
      return state;
  }
};
