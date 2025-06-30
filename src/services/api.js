// src\services\api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.219:8000/api',
  withCredentials: true,
  });

export default api;