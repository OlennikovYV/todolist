import { useReducer } from "react";
import axios from "axios";

import { initialStateTask, ReducerTask } from "../reducers/ReducerTask.js";

import { sortByFieldDate, sortByFieldNumber } from "../utils/sortByField";

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
        payload: response.data,
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

  async function getPriorities() {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/reference/priorities`
      );

      dispatch({
        type: "GET_PRIORITIES",
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
    priorities: state.priorities,
    getAllTasks,
    addTask,
    getPriorities,
    sortUpdateAt,
    sortResponsibleId,
  };
};

export default ActionTask;
