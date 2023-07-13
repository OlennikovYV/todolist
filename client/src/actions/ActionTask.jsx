import { useReducer } from "react";
import axios from "axios";

import { initialStateTask, ReducerTask } from "../reducers/ReducerTask.js";

import { sortByFieldDate, sortByFieldNumber } from "../utils/sortByField";

const ActionTask = () => {
  const [state, dispatch] = useReducer(ReducerTask, initialStateTask);

  async function getAllTasks(authenticationID) {
    dispatch({ type: "SET_STATUS_LOADING", payload: { loadingTask: true } });

    try {
      const response = await axios.get(
        `http://localhost:3001/api/task/${authenticationID}`
      );

      sortByFieldDate(response.data.taskList, "update_at");

      dispatch({
        type: "GET_ALL_TASKS",
        payload: {
          successTask: response.data.successTask,
          taskList: response.data.taskList,
          messageTask: response.data.messageTask,
        },
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: { errorTask: err.response.data.errorTask },
      });
    } finally {
      dispatch({ type: "SET_STATUS_LOADING", payload: { loadingTask: false } });
    }
  }

  async function addTask(data) {
    dispatch({ type: "SET_STATUS_LOADING", payload: { loadingTask: true } });

    try {
      const response = await axios.post(`http://localhost:3001/api/task/add`, {
        transaction: data,
      });

      dispatch({
        type: "ADD_TASK",
        payload: {
          successTask: response.data.successTask,
          record: response.data.record,
          messageTask: response.data.messageTask,
        },
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: { errorTask: err.response.data.errorTask },
      });
    } finally {
      dispatch({ type: "SET_STATUS_LOADING", payload: { loadingTask: false } });
    }
  }

  async function updateTask(id, data) {
    const taskList = state.taskList.slice(0);
    const index = taskList.findIndex((task) => task.id === id);

    dispatch({ type: "SET_STATUS_LOADING", payload: { loadingTask: true } });

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
        payload: { taskList: taskList },
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: { errorTask: err.response.data.errorTask },
      });
    } finally {
      dispatch({ type: "SET_STATUS_LOADING", payload: { loadingTask: false } });
    }
  }

  async function getPriorities() {
    dispatch({ type: "SET_STATUS_LOADING", payload: { loadingTask: true } });

    try {
      const response = await axios.get(
        `http://localhost:3001/api/task/priorities`
      );

      dispatch({
        type: "GET_PRIORITIES",
        payload: {
          successTask: response.data.successTask,
          prioritiesList: response.data.prioritiesList,
          messageTask: response.data.messageTask,
        },
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: { errorTask: err.response.data.errorTask },
      });
    } finally {
      dispatch({ type: "SET_STATUS_LOADING", payload: { loadingTask: false } });
    }
  }

  function sortUpdateAt() {
    const taskList = state.taskList.slice(0);

    sortByFieldDate(taskList, "update_at");

    dispatch({
      type: "SORT_UPDATE-AT",
      payload: { taskList: taskList },
    });
  }

  function sortResponsibleId() {
    const taskList = state.taskList.slice(0);

    sortByFieldNumber(taskList, "responsibleid");

    dispatch({
      type: "SORT_RESPONSIBLEID",
      payload: { taskList: taskList },
    });
  }

  return {
    errorTask: state.error,
    loadingTask: state.loading,
    messageTask: state.message,
    prioritiesList: state.prioritiesList,
    successTask: state.success,
    taskList: state.taskList,
    addTask,
    getAllTasks,
    getPriorities,
    sortResponsibleId,
    sortUpdateAt,
    updateTask,
  };
};

export default ActionTask;
