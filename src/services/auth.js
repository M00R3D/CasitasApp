import axios from 'axios';

// Configura tu API base (cambia IP si es necesario)
const API = axios.create({
  baseURL: 'http://192.168.1.219:8000/api'
});

// Login: solicita token y guarda
export async function login(email, password) {
  const response = await API.post('/login', {
    email,
    password
  });

  const token = response.data.access_token;

  // Guardar el token para siguientes peticiones
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);

  return response.data;
}

// Obtener usuario autenticado
export async function fetchUser() {
  const token = localStorage.getItem('token');

  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const response = await API.get('/users'); // Asegúrate que este endpoint exista
  return response.data;
}

// Logout
export async function logout() {
  const response = await API.post('/logout');

  localStorage.removeItem('token');
  delete API.defaults.headers.common['Authorization'];

  return response.data;
}
