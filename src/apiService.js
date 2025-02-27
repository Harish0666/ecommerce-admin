import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json hahahaha",
  },
});

export const loginUser = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const signUpUser = async (name, email, password) => {
  const data = {
    name: name,
    email: email,
    password: password,
    confirmPassword: password,
  };
  try {
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getData = async (method) => {
  try {
    const response = await apiClient.get(method); // Example URL
    return response.data; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const postData = async (method, data) => {
  try {
    const response = await apiClient.post(method, data);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateData = async (method, data) => {
  try {
    const response = await apiClient.put(method, data);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteData = async (method, data) => {
  try {
    const response = await apiClient.delete(method, data);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
