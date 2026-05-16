import API from "./axios";

export const getUsersApi = async () => {

  const response = await API.get(
    "/user/AllUsers",
    {
      withCredentials: true,
    }
  );

  return response.data;
};