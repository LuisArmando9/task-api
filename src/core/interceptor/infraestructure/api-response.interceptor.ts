import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/core/api-response/core/domain/models/api-response.model';
import { HttpCode, HttpStatus } from 'src/core/exception/core/domain/enums/http-status.enum';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const path = request.url;

    return next.handle().pipe(
      map((data): ApiResponse<unknown> => ({
        status: HttpStatus.FAILED,
        code: HttpCode.OK,
        path,
        method:  request.method,
        timestamp: new Date(),
        data
      })),
    );
  }
}
