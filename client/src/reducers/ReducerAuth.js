export const initialStateAuth = {
  authenticatedUser: null,
  isAuthenticated: false,
  error: null,
  message: null,
  status: null,
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
      };
    case "RESET_STATE":
      return initialStateAuth;
    case "TASK_ERROR":
      return {
        ...state,
        error: true,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
