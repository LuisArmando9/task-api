import { HttpCode, HttpStatus } from "src/core/exception/core/domain/enums/http-status.enum";
import { HttpExceptionBase } from "src/core/exception/core/domain/models/http-exception.base";

export class TaskNotFoundException extends HttpExceptionBase {
    constructor() {
        super();
        this.setMessage('TASK.NOT_FOUND');
        this.setStatus(HttpStatus.FAILED);
        this.setCode(HttpCode.NotFound);
    }
}