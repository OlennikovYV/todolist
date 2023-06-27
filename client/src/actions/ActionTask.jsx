import { useReducer } from "react";
import axios from "axios";

import { initialStateTask, ReducerTask } from "../reducers/ReducerTask.js";

import {
  sortByFieldDate,
  sortByFieldNumber,
} from "../utils/sortByField/sortByField.js";

const ActionTask = () => {
  const [state, dispatch] = useReducer(ReducerTask, initialStateTask);

  async function getAllTasks(authenticationID) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/task/${authenticationID}`
      );

      sortByFieldDate(response.data.taskList, "update_at");

      dispatch({
        type: "GET_ALL_TASKS",
        payload: response.data.taskList,
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addTask(task) {
    try {
      const response = await axios.post(`http://localhost:3001/api/task/add`, {
        transaction: task,
      });

      dispatch({
        type: "ADD_TASK",
        payload: response.data.record,
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
    addTask,
    sortUpdateAt,
    sortResponsibleId,
  };
};

export default ActionTask;
