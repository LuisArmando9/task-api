import { HttpCode, HttpStatus } from "../enums/http-status.enum";

export class HttpExceptionBase  {
    private _code: HttpCode;
    protected _message: string;
    protected _status: HttpStatus;
  

    get message(): string {
        return this._message;
    }

    get status(): HttpStatus {
        return this._status;
    }

    get code(): HttpCode {
        return this._code;
    }

    setCode(code: number): this {
        this._code = code;
        return this;
    }

    setMessage(message: string): this {
        this._message = message;
        return this;
    }

    setStatus(status: HttpStatus): this {
        this._status = status;
        return this;
    }

    static build() : HttpExceptionBase {
        return new HttpExceptionBase();
    }

    
}