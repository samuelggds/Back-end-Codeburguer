import { api } from './api'

export const authService = {
  async login({ email, password }) {
    const { data } = await api.post('/login', { email, password })
    if (!data?.token || !data?.id) throw new Error('Resposta de autenticação inválida')
    return data
  },
  async register({ name, email, password }) {
    const { data } = await api.post('/users', { name, email, password })
    return data
  },
}

export function getApiError(error) {
  if (!error.response) return error.message === 'Network Error'
    ? 'Não foi possível conectar à API. Verifique se o backend está ligado na porta 3001.'
    : error.message || 'Não foi possível concluir sua solicitação.'
  const data = error.response.data
  if (Array.isArray(data?.error)) return data.error.join(', ')
  return data?.message || data?.error || 'Não foi possível concluir sua solicitação.'
}
