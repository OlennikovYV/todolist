import React from "react";

import useFetch from "../hooks/fetch";

function Task() {
  const { loading, data, error } = useFetch(
    `http://localhost:3001/api/task/all`
  );

  if (loading) return <h1>loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  console.log(data.tasks);

  return <p>Task</p>;
}

export default Task;
