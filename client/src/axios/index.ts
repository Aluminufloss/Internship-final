import axios from "axios";
import { API_URL } from "@/utils/constant/constant";
import { AuthRespone } from "@/models/response/Auth/AuthResponse";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// $api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

$api.interceptors.request.use(async (config) => {
  try {
    const response = await axios.get<AuthRespone>(`${API_URL}/refresh`, { withCredentials: true });
    const token = response.data.accessToken;
    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {
    console.log("Не авторизован");
  }

  return config;
});


$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  console.log("error", error);
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<AuthRespone>(`${API_URL}/refresh`, { withCredentials: true });
      localStorage.setItem("token", response.data.accessToken);
      return $api.request(originalRequest);
    } catch (err) {
      console.log("Не авторизован");
    }
  }
  throw error;
});

export default $api;