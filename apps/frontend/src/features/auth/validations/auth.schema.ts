import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
})

export type LoginFormData = yup.InferType<typeof loginSchema>

export const registerSchema = yup.object({
  name: yup.string().min(2, 'Nome deve ter no mínimo 2 caracteres').required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
})

export type RegisterFormData = yup.InferType<typeof registerSchema>
