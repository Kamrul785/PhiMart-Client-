import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://phi-mart-three.vercel.app/api/v1",
});

export default apiClient;


// https://phi-mart-three.vercel.app/api/v1
// http://127.0.0.1:8000/api/v1