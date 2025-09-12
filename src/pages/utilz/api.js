// utils/api.js
const API_BASE =
  import.meta.env.MODE === "development"
    ? "/api" // ✅ goes through Vite proxy in dev
    : "https://realtyfinder.onrender.com/api"; // ✅ full backend URL in production

export default API_BASE;
