import { useReducer } from "react";
import axios from "axios";

import { initialStateTask, ReducerTask } from "../reducers/ReducerTask.js";

import { sortByFieldDate, sortByFieldNumber } from "../utils/sortByField";

const ActionTask = () => {
  const [state, dispatch] = useReducer(ReducerTask, initialStateTask);

  async function getAllTasks(authenticationID) {
    dispatch({ type: "SET_STATUS_LOADING", payload: true });

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
    } finally {
      dispatch({ type: "SET_STATUS_LOADING", payload: false });
    }
  }

  async function addTask(data) {
    dispatch({ type: "SET_STATUS_LOADING", payload: true });

    try {
      const response = await axios.post(`http://localhost:3001/api/task/add`, {
        transaction: data,
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
    } finally {
      dispatch({ type: "SET_STATUS_LOADING", payload: false });
    }
  }

  async function updateTask(id, data) {
    const taskList = state.tasks.slice(0);
    const index = taskList.findIndex((task) => task.id === id);

    dispatch({ type: "SET_STATUS_LOADING", payload: true });

    try {
      const response = await axios.put(
        `http://localhost:3001/api/task/update/${id}`,
        {
          transaction: data,
        }
      );

      taskList[index] = response.data.record;

      dispatch({
        type: "UPDATE_TASK",
        payload: taskList,
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: err.response.data.error,
      });
    } finally {
      dispatch({ type: "SET_STATUS_LOADING", payload: false });
    }
  }

  async function getPriorities() {
    dispatch({ type: "SET_STATUS_LOADING", payload: true });

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
    } finally {
      dispatch({ type: "SET_STATUS_LOADING", payload: false });
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
    error: state.error,
    loading: state.loading,
    message: state.message,
    priorities: state.priorities,
    success: state.success,
    taskList: state.tasks,
    addTask,
    getAllTasks,
    getPriorities,
    sortResponsibleId,
    sortUpdateAt,
    updateTask,
  };
};

export default ActionTask;
