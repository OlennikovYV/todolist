export const initialStateTask = {
  tasks: [],
  error: null,
  success: null,
};

export const ActionTask = (state, action) => {
  switch (action.type) {
    case "GET_ALL_TASKS":
      return {
        ...state,
        success: action.payload.success,
        tasks: action.payload.taskList,
        message: action.payload.message,
      };
    case "SORT_UPDATE-AT":
      return {
        ...state,
        tasks: action.payload,
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
