import { useReducer } from "react";
import axios from "axios";

import { initialStateTask, ReducerTask } from "../reducers/ReducerTask.js";

import {
  GET_ALL_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  SET_DISPLAY_PERIOD,
  SET_SORT_FIELD_NAME,
  GET_PRIORITIES,
  ERROR,
  SET_STATUS_LOADING,
} from "../constants";

const ActionTask = () => {
  const [state, dispatch] = useReducer(ReducerTask, initialStateTask);

  async function getAllTasks(authenticationID) {
    const params = {
      id: authenticationID,
      displayPeriodName: state.displayPeriodName,
      limit: state.limitPage,
      page: state.currentPage,
      sortOrder: state.sortOrder,
      sortFieldName: state.sortFieldName,
    };

    dispatch({
      type: SET_STATUS_LOADING,
      payload: { loadingTask: true },
    });

    try {
      const response = await axios.get(`http://localhost:3001/api/task/`, {
        params,
      });

      dispatch({
        type: GET_ALL_TASKS,
        payload: {
          messageTask: response.data.messageTask,
          successTask: response.data.successTask,
          taskList: response.data.taskList,
        },
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: { errorTask: err.message },
      });
    } finally {
      dispatch({
        type: SET_STATUS_LOADING,
        payload: { loadingTask: false },
      });
    }
  }

  async function addTask(data) {
    dispatch({
      type: SET_STATUS_LOADING,
      payload: { loadingTask: true },
    });

    try {
      const response = await axios.post(`http://localhost:3001/api/task/add`, {
        transaction: data,
      });

      dispatch({
        type: ADD_TASK,
        payload: {
          messageTask: response.data.messageTask,
          record: response.data.record,
          successTask: response.data.successTask,
        },
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: { errorTask: err.response.data.errorTask },
      });
    } finally {
      dispatch({
        type: SET_STATUS_LOADING,
        payload: { loadingTask: false },
      });
    }
  }

  async function updateTask(id, data) {
    const taskList = state.taskList.slice(0);
    const index = taskList.findIndex((task) => task.id === id);

    dispatch({
      type: SET_STATUS_LOADING,
      payload: { loadingTask: true },
    });

    try {
      const response = await axios.put(
        `http://localhost:3001/api/task/update/${id}`,
        {
          transaction: data,
        }
      );

      taskList[index] = response.data.record;

      dispatch({
        type: UPDATE_TASK,
        payload: {
          messageTask: response.data.messageTask,
          taskList: taskList,
          successTask: response.data.successTask,
        },
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: { errorTask: err.response.data.errorTask },
      });
    } finally {
      dispatch({
        type: SET_STATUS_LOADING,
        payload: { loadingTask: false },
      });
    }
  }

  function setDisplayPeriodName(period) {
    dispatch({
      type: SET_DISPLAY_PERIOD,
      payload: { displayPeriodName: period },
    });
  }

  function setSortFieldName(sortFieldName, sortOrder) {
    dispatch({
      type: SET_SORT_FIELD_NAME,
      payload: {
        sortFieldName: sortFieldName,
        sortOrder: sortOrder,
      },
    });
  }

  async function getPriorities() {
    dispatch({
      type: SET_STATUS_LOADING,
      payload: { loadingTask: true },
    });

    try {
      const response = await axios.get(
        `http://localhost:3001/api/task/priorities`
      );

      dispatch({
        type: GET_PRIORITIES,
        payload: {
          successTask: response.data.successTask,
          prioritiesList: response.data.prioritiesList,
          messageTask: response.data.messageTask,
        },
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: { errorTask: err.message },
      });
    } finally {
      dispatch({
        type: SET_STATUS_LOADING,
        payload: { loadingTask: false },
      });
    }
  }

  return {
    displayPeriodName: state.displayPeriodName,
    errorTask: state.error,
    loadingTask: state.loadingTask,
    messageTask: state.messageTask,
    prioritiesList: state.prioritiesList,
    sortFieldName: state.sortFieldName,
    sortOrder: state.sortOrder,
    successTask: state.success,
    taskList: state.taskList,
    addTask,
    getAllTasks,
    getPriorities,
    setDisplayPeriodName,
    setSortFieldName,
    updateTask,
  };
};

export default ActionTask;
