import { z } from 'zod'

const UserSchema = z.object({
  id: z.string(),
  phone: z.string().regex(/^\d{9}$/, { message: 'El celular debe tener 9 digitos' }),
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }).max(50, { message: 'El nombre debe tener máximo 50 caracteres' }).regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, { message: 'El nombre solo puede contener letras o espacios' }),
  lastname: z.string().min(3, { message: 'El apellido debe tener al menos 3 caracteres' }).max(50, { message: 'El nombre debe tener máximo 50 caracteres' }).regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, { message: 'El nombre solo puede contener letras o espacios' }),
  password: z.string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .regex(/^[A-Za-z0-9]+$/, {
      message: 'La contraseña debe contener letras y números, sin espacios ni símbolos',
    }),
  password_confirmation: z.string().min(8, { message: 'La confirmación de la contraseña es obligatoria' }),
  type_doc: z.enum(['DNI', 'Pasaporte', 'CE'], { message: 'El tipo de documento es obligatorio' }),
  num_doc: z.string().min(8, { message: 'El número de documento debe tener al menos 8 caracteres' }),
  role: z.number({ message: 'El rol es obligatorio' }),
  email: z.string().email({ message: 'El email debe tener un formato válido' }).nullable().optional(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().nullable()
})

export const RegisterSchema = UserSchema.refine(data => data.password === data.password_confirmation, {
  message: 'Las contraseñas no coinciden.',
  path: ['password_confirmation'],
})

export const LoginSchema = z.object({
  phone: z.string().nonempty({ message: 'El celular es obligatorio' }).regex(/^\d{9}$/, { message: 'El celular debe tener un formato válido' }),
  password: z.string().nonempty({ message: 'La contraseña es obligatoria' })
})

export const GenericSuccessSchema = z.object({
  message: z.string()
})

export const ErrorResponseSchema = z.object({
  statusCode: z.number(),
  error: z.string().optional(),
  message: z.string()
})

export const UserResponseSchema = UserSchema.omit({
  'password_confirmation': true,
  'password': true,
})

//RESPONSES
export type UserResponse = z.infer<typeof UserResponseSchema>
export type GenericResponse = z.infer<typeof GenericSuccessSchema>
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

//REQUEST
export type LoginData = z.infer<typeof LoginSchema>
