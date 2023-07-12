import { useReducer } from "react";
import axios from "axios";

import { initialStateUser, ReducerUser } from "../reducers/ReducerUser";

const ActionUser = () => {
  const [state, dispatch] = useReducer(ReducerUser, initialStateUser);

  async function getResponsibleList() {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/user/responsible`
      );

      dispatch({
        type: "GET_RESPONSIBLE_LIST",
        payload: {
          responsibleList: {
            messageUser: response.data.messageUser,
            responsibleList: response.data.responsibleList,
            successUser: response.data.successUser,
          },
        },
      });
    } catch (err) {
      dispatch({
        type: "ERROR_USER",
        payload: {
          errorUser: err.response.data.errorUser,
          messageUser: err.response.data.messageUser,
          successUser: err.response.data.successUser,
        },
      });
    }
  }

  async function getResponsible(responsibleId) {
    try {
      const response = await axios.get(`/api/user/responsible/:id`, {
        transaction: responsibleId,
      });

      dispatch({
        type: "GET_RESPONSIBLE",
        payload: {
          messageUser: response.data.messageUser,
          responsible: response.data.responsible,
          successUser: response.data.successUser,
        },
      });
    } catch (err) {
      dispatch({
        type: "ERROR_USER",
        payload: {
          errorUser: err.response.data.errorUser,
          messageUser: err.response.data.messageUser,
          successUser: err.response.data.successUser,
        },
      });
    }
  }

  return {
    errorUser: state.errorUser,
    messageUser: state.messageUser,
    responsible: state.responsible,
    responsibleList: state.responsibleList,
    successUser: state.successUser,
    getResponsible,
    getResponsibleList,
  };
};

export default ActionUser;
