export const initialStateUser = {
  errorUser: null,
  messageUser: null,
  responsible: null,
  responsibleList: [],
  successUser: null,
};

export const ReducerUser = (state, action) => {
  switch (action.type) {
    case "GET_RESPONSIBLE_LIST":
      return {
        ...state,
        messageUser: action.payload.messageUser,
        responsibleList: action.payload.responsibleList,
        successUser: action.payload.successUser,
      };
    case "GET_RESPONSIBLE":
      return {
        ...state,
        messageUser: action.payload.messageUser,
        responsible: action.payload.responsible,
        successUser: action.payload.successUser,
      };
    case "ERROR_USER":
      return {
        ...state,
        errorUser: action.payload.errorUser,
        messageUser: action.payload.messageUser,
        successUser: action.payload.successUser,
      };
    default:
      return state;
  }
};
