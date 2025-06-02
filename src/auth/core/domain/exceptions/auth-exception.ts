import { HttpCode, HttpStatus } from "src/core/exception/core/domain/enums/http-status.enum";
import { HttpExceptionBase } from "src/core/exception/core/domain/models/http-exception.base";

export class InvalidCredentialsException extends  HttpExceptionBase {
    constructor() {
        super();
        this.setMessage('AUTH.INVALID_CREDENTIALS');
        this.setStatus(HttpStatus.FAILED);
        this.setCode(HttpCode.Unauthorized);
    }
}