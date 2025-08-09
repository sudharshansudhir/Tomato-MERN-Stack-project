
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
axios.defaults.baseURL = API;

export default axios;