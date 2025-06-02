import {
  HttpCode,
  HttpStatus,
} from 'src/core/exception/core/domain/enums/http-status.enum';

export interface ApiResponse<TypeData> {
  status: HttpStatus;
  code: HttpCode;
  path: string;
  method: string;
  timestamp: Date;
  data: TypeData;
}

export interface ApiResponseError {
  message: string;
  metadata: object | string | null;
}
