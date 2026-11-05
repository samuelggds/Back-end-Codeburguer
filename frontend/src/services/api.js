import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('devburger_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !['/login', '/users'].includes(error.config?.url)) {
      sessionStorage.removeItem('devburger_token')
      sessionStorage.removeItem('devburger_user')
      window.dispatchEvent(new Event('devburger:unauthorized'))
    }
    return Promise.reject(error)
  }
)
