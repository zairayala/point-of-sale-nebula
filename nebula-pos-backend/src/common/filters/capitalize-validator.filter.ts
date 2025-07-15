import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(BadRequestException)
export class CapitalizeValidationFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const exceptionResponse = exception.getResponse()

        const message =
            typeof exceptionResponse === 'object' && exceptionResponse !== null && 'message' in exceptionResponse
                ? (exceptionResponse as any).message
                : exception.message

        const formatMessage = (msg: string) =>
            msg.charAt(0).toUpperCase() + msg.slice(1)

        const formattedMessage = Array.isArray(message)
            ? message.map(formatMessage)
            : formatMessage(message)

        response.status(status).json({
            statusCode: status,
            message: formattedMessage,
        })
    }
}
