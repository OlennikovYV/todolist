import { useReducer } from "react";
import axios from "axios";

import { initialStateTask, ActionTask } from "../actions/ActionTask";

const ReducerTask = () => {
  const [state, dispatch] = useReducer(ActionTask, initialStateTask);

  async function getAllTasks(authenticationID) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/task/${authenticationID}`
      );

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

  return {
    taskList: state.tasks,
    getAllTasks,
  };
};

export default ReducerTask;
