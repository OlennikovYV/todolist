import { useReducer } from "react";
import axios from "axios";

import { initialStateTask, ActionTask } from "../actions/ActionTask";

import {
  sortByFieldDate,
  sortByFieldNumber,
} from "../utils/sortByField/sortByField.js";

const ReducerTask = () => {
  const [state, dispatch] = useReducer(ActionTask, initialStateTask);

  async function getAllTasks(authenticationID) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/task/${authenticationID}`
      );

      sortByFieldDate(response.data.taskList, "update_at");

      dispatch({
        type: "GET_ALL_TASKS",
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  function sortUpdateAt() {
    const tasks = state.tasks.slice(0);

    sortByFieldDate(tasks, "update_at");

    dispatch({
      type: "SORT_UPDATE-AT",
      payload: tasks,
    });
  }

  function sortResponsibleId() {
    const tasks = state.tasks.slice(0);

    sortByFieldNumber(tasks, "responsibleid");

    dispatch({
      type: "SORT_RESPONSIBLEID",
      payload: tasks,
    });
  }

  return {
    success: state.success,
    error: state.error,
    message: state.message,
    taskList: state.tasks,
    getAllTasks,
    sortUpdateAt,
    sortResponsibleId,
  };
};

export default ReducerTask;
