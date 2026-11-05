import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthLayout, { AuthFooter } from '../components/AuthLayout'
import { registerSchema } from '../schemas/authSchemas'
import { authService, getApiError } from '../services/authService'

export default function Register() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(registerSchema) })
  const onSubmit = async ({ name, email, password }) => {
    setApiError('')
    try {
      await authService.register({ name, email, password })
      navigate('/login', { replace: true, state: { registered: true } })
    } catch (error) {
      setApiError(getApiError(error))
    }
  }
  return (
    <AuthLayout>
      <h1 className="register-heading">Criar conta</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="auth-form">
        <label htmlFor="register-name">Nome</label>
        <input id="register-name" autoComplete="name" aria-invalid={!!errors.name} {...register('name')} />
        {errors.name && <span className="field-error">{errors.name.message}</span>}
        <label htmlFor="register-email">Email</label>
        <input id="register-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
        {errors.email && <span className="field-error">{errors.email.message}</span>}
        <label htmlFor="register-password">Senha</label>
        <input id="register-password" type="password" autoComplete="new-password" aria-invalid={!!errors.password} {...register('password')} />
        {errors.password && <span className="field-error">{errors.password.message}</span>}
        <label htmlFor="register-confirm">Confirmar senha</label>
        <input id="register-confirm" type="password" autoComplete="new-password" aria-invalid={!!errors.confirmPassword} {...register('confirmPassword')} />
        {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.message}</span>}
        {apiError && <p role="alert" className="api-error">{apiError}</p>}
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'CADASTRANDO...' : 'CONFIRMAR CADASTRO'}</button>
      </form>
      <AuthFooter register />
    </AuthLayout>
  )
}
