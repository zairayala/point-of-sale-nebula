import apiClient from "@/lib/api";
import { ErrorResponse, ErrorResponseSchema, GenericResponse, GenericSuccessSchema, LoginData, UserResponse, UserResponseSchema } from "@/src/schemas/auth.schema";
import { AxiosError } from "axios";

export const login = async (data: LoginData) : Promise<GenericResponse | ErrorResponse> => {
    try {
        const result = await apiClient.post('/api/auth/login', data)
        const response = GenericSuccessSchema.parse(result.data)
        return response
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            if (error.response.status === 401 || error.response.status === 404) {
                const errors = ErrorResponseSchema.parse(error.response.data)
                console.log(errors.message)
                return errors
            }
        }
        console.log(error)
        return {
            statusCode: 500,
            message: 'Something went wrong',
            error: 'Unexpected error'
        }
    
    }
}
export const logout = async () => {
    try {
        const result = await apiClient.post('/api/auth/logout')
        const response = result.data
        return response
    } catch (error) {
        console.log("error", error)

    }
}

export const getCurrentUser = async (): Promise<UserResponse | null> => {
    try {
        const result = await apiClient.get('/api/auth/user', {
            withCredentials: true,
        })

        const response = UserResponseSchema.safeParse(result.data)
        if (!response.success) {
            console.log("Error de validación:", response.error)
            return null
        }

        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}