import axios from 'axios';
import { API_URL } from "@/utils/constant/constant";
import { AuthRespone } from "@/models/response/Auth/AuthResponse";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  try {
    const token = config.data.accessToken;

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {
    console.log(err, "Ошибка при формировании заголовка запроса");
  }

  return config;
});


$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const { refreshToken } = JSON.parse(originalRequest.data);
      console.log("Yep")

      const response = await axios.post<AuthRespone>(`${API_URL}/refresh`, { withCredentials: true, refreshToken });
      const token = response.data.accessToken;

      console.log("Datas", response.data);

      originalRequest.headers.Authorization = `Bearer ${token}`;
      originalRequest.headers.token = response.data.refreshToken;

      return $api.request(originalRequest);
    } catch (err) {
      console.log("Ошибка перехватчика на 401 статус-код", err);
    }
  }
  throw error;
});

export default $api;