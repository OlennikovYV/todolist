import { useReducer } from "react";
import axios from "axios";

import { initialStateAuth, ReducerAuth } from "../reducers/ReducerAuth";

const ActionAuth = () => {
  const [state, dispatch] = useReducer(ReducerAuth, initialStateAuth);

  function logout() {
    dispatch({
      type: "RESET_STATE",
      payload: null,
    });
  }

  async function signIn(user, password) {
    try {
      let response;

      dispatch({
        type: "RESET_STATE",
        payload: null,
      });

      response = await axios.post(
        "http://localhost:3001/api/auth",
        {
          login: user,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.authenticatedUser)
      );

      dispatch({
        type: "SIGN_IN",
        payload: {
          isAuthenticated: true,
          authenticatedUser: response.data.authenticatedUser,
          message: response.data.message,
          status: response.status,
          success: response.data.success,
          error: null,
        },
      });
    } catch (err) {
      let message = err.response.data.message;

      dispatch({
        type: "TASK_ERROR",
        payload: {
          error: true,
          message: message,
        },
      });
    }
  }

  function signInFromCache(data) {
    try {
      dispatch({
        type: "SIGN_IN",
        payload: {
          authenticatedUser: data,
          isAuthenticated: true,
          error: null,
          message: "Аутентификация успешна!",
          status: null,
          success: true,
        },
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  return {
    isAuthenticated: state.isAuthenticated,
    authenticatedUser: state.authenticatedUser,
    error: state.error,
    message: state.message,
    success: state.success,
    logout,
    signIn,
    signInFromCache,
  };
};

export default ActionAuth;
