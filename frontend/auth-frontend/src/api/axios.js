import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // REQUIRED for refresh cookie
});

// REQUEST INTERCEPTOR
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (
    token &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/signup") &&
    !config.url.includes("/auth/refresh")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await instance.post("/auth/refresh");
        localStorage.setItem("token", res.data.token);

        originalRequest.headers.Authorization =
          `Bearer ${res.data.token}`;

        return instance(originalRequest);
      } catch (refreshError) {
        //  Refresh failed → logout
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
