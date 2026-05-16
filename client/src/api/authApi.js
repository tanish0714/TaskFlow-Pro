import API from "./axios";

export const loginUser = async (data) => {
  const response = await API.post("/user/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await API.post("/user/signup", data);
  return response.data;
};