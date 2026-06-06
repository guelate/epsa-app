import axios from 'axios'

// Axios instance with the API base URL pre-configured.
const api = axios.create({
  baseURL: 'http://localhost:3333',
})

// Intercepts every request and injects the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api