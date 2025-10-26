import axios from "axios";

const authApliClient = axios.create({
  baseURL: "https://phi-mart-three.vercel.app/api/v1",
});

export default authApliClient;

authApliClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      config.headers.Authorization = `JWT ${JSON.parse(token)?.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
