import API from "./axios";

export const createTaskApi = async (taskData) => {

  const response = await API.post(
    "/task/create",
    taskData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};
export const getTasksApi = async (
  filters = {}
) => {

  const query = new URLSearchParams(
    filters
  ).toString();

  const response = await API.get(
    `/task?${query}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const updateTaskApi = async (
  taskId,
  updatedData
) => {

  const response = await API.put(
    `/task/${taskId}`,
    updatedData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};
export const getTaskStatsApi =
  async () => {

    const response = await API.get(
      "/task/stats",
      {
        withCredentials: true,
      }
    );

    return response.data;
  };

export const updateTaskStatusApi = async (
  taskId,
  status
) => {

  const response = await API.put(
    `/task/${taskId}/status`,
    { status },
    {
      withCredentials: true,
    }
  );

  return response.data;
};
export const deleteTaskApi = async (
  taskId
) => {

  const response = await API.delete(
    `/task/${taskId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};
