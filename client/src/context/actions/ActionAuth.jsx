import { useReducer } from "react";
import axios from "axios";

import { initialStateAuth, ReducerAuth } from "../reducers/ReducerAuth";

import { SIGN_IN, RESET_STATE, TASK_ERROR } from "../constants";

const ActionAuth = () => {
  const [state, dispatch] = useReducer(ReducerAuth, initialStateAuth);

  function logout() {
    localStorage.clear();

    dispatch({ type: RESET_STATE });
  }

  async function signIn(user, password) {
    try {
      let response;

      dispatch({ type: RESET_STATE });

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

      if (response.status === 200) {
        dispatch({
          type: SIGN_IN,
          payload: {
            isAuthenticated: true,
            authenticatedUser: response.data.authenticatedUser,
            message: response.data.message,
            status: response.status,
            error: null,
          },
        });
      } else {
        dispatch({
          type: TASK_ERROR,
          payload: {
            message: response.data.message,
          },
        });
      }
    } catch (error) {
      let message = error.response.data.message;

      dispatch({
        type: TASK_ERROR,
        payload: {
          message: message,
        },
      });
    }
  }

  function signInFromCache(data) {
    try {
      dispatch({
        type: SIGN_IN,
        payload: {
          authenticatedUser: data,
          isAuthenticated: true,
          error: null,
          status: null,
        },
      });
    } catch (error) {
      dispatch({
        type: TASK_ERROR,
        payload: {
          message: error.message,
        },
      });
    }
  }

  return {
    isAuthenticated: state.isAuthenticated,
    authenticatedUser: state.authenticatedUser,
    error: state.error,
    message: state.message,
    logout,
    signIn,
    signInFromCache,
  };
};

export default ActionAuth;
