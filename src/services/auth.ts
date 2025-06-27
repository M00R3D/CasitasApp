import axios from 'axios'

// API base para Laravel (ajusta según IP de tu servidor si no usas localhost)
const API = axios.create({
  baseURL: 'http://192.168.1.219:8000/api'
})

// Función de login
export async function login(email: string, password: string) {
  const response = await API.post('/login', {
    email,
    password
  })

  // Guarda el token en localStorage o donde lo necesites
  const token = response.data.access_token
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`

  // También podrías guardar el token en localStorage para mantener la sesión
  localStorage.setItem('token', token)

  return response.data
}

// Cargar usuario autenticado
export async function fetchUser() {
  const token = localStorage.getItem('token')
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const response = await API.get('/user')
  return response.data
}

// Logout
export async function logout() {
  const response = await API.post('/logout')
  localStorage.removeItem('token')
  return response.data
}
