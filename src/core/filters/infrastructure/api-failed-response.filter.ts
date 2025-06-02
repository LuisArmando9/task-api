import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { ApiResponse, ApiResponseError } from 'src/core/api-response/core/domain/models/api-response.model';
import { HttpCode, HttpStatus } from 'src/core/exception/core/domain/enums/http-status.enum';
import { HttpExceptionBase } from 'src/core/exception/core/domain/models/http-exception.base';

@Catch()
export class ApiFailedResponseFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const i18n = I18nContext.current();

    let status = HttpStatus.FAILED;
    let message = 'INTERNAL_SERVER_ERROR';
    let code = HttpCode.InternalServerError;
    let metadata = {};
    Logger.error(exception);
    if (exception instanceof HttpExceptionBase) {
      status = exception.status;
      message = `error.${exception.message}`;
      code = exception.code;
    }
    if (exception instanceof HttpException) {
      status = HttpStatus.FAILED;
      message = exception.message;
      code = exception.getStatus();
      metadata = exception.getResponse();
    }

    const apiResponse: ApiResponse<ApiResponseError> = {
        status: status,
        code: code,
        path: request.url,
        method: request.method,
        timestamp: new Date(),
        data: {
            message: i18n?.t ? i18n.t(message) : message,
            metadata: metadata,
        }
    }
    response.status(code).json(
      apiResponse
    );
  }
}
