import axios from "axios";

/* =========================
   BASE URL
========================= */

const BASE_URL = "https://india-temple-heritage-pilgrimage.onrender.com/api";

// const BASE_URL = "http://localhost:5000/api";

// "http://localhost:5000/api";
/* =========================
   AXIOS INSTANCE
========================= */

const API = axios.create({
  baseURL: BASE_URL,
});

/* =========================
   ADD TOKEN AUTOMATICALLY
========================= */

API.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const token = JSON.parse(userInfo).token;

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default API;
