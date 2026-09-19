import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_END_POINT || "http://localhost:3000/";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired or invalid, clear localStorage if not on login/signup page
      const currentPath = window.location.pathname.toLowerCase();
      if (!currentPath.includes("login") && !currentPath.includes("signup")) {
        console.warn("Session expired or unauthorized. Redirecting to login...");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("number");
        // Optionally redirect: window.location.href = "/Login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { apiClient };
