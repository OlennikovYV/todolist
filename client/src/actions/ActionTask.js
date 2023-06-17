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
