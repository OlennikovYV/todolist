export const initialStateAuth = {
  authenticatedUser: null,
  isAuthenticated: false,
  error: null,
  message: null,
  status: null,
  success: null,
};

export const ReducerAuth = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        authenticatedUser: action.payload.authenticatedUser,
        isAuthenticated: action.payload.isAuthenticated,
        error: action.payload.error,
        message: action.payload.message,
        status: action.payload.status,
        success: action.payload.success,
      };
    case "RESET_STATE":
      return {
        ...state,
        authenticatedUser: null,
        isAuthenticated: false,
        error: null,
        message: null,
        status: null,
        success: null,
      };
    case "TASK_ERROR":
      return {
        ...state,
        authenticatedUser: null,
        isAuthenticated: false,
        error: action.payload.error,
        message: action.payload.message,
        status: action.payload.status,
        success: null,
      };
    default:
      return state;
  }
};
