import { z } from 'zod'
export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Informe seu e-mail').email('Digite um e-mail válido'),
  password: z.string().min(1, 'Informe sua senha'),
})
export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Informe pelo menos 2 caracteres'),
  email: z.string().trim().min(1, 'Informe seu e-mail').email('Digite um e-mail válido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres').max(15, 'Máximo de 15 caracteres'),
  confirmPassword: z.string().min(1, 'Confirme sua senha'),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'], message: 'As senhas não coincidem',
})
