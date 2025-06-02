import { HttpCode, HttpStatus } from "src/core/exception/core/domain/enums/http-status.enum";
import { HttpExceptionBase } from "src/core/exception/core/domain/models/http-exception.base";

export class UserNotFoundException extends HttpExceptionBase {
    constructor() {
        super();
        this.setMessage('USER.NOT_FOUND');
        this.setStatus(HttpStatus.FAILED);
        this.setCode(HttpCode.NotFound);
    }
}

export class UserEmailAlreadyExistsException extends HttpExceptionBase {
    constructor() {
        super();
        this.setMessage('USER.EMAIL_ALREADY_EXISTS');
        this.setStatus(HttpStatus.FAILED);
        this.setCode(HttpCode.BadRequest);
    }
}