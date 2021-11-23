import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorResponse } from '../interfaces/error-response';
import { Utils } from '../../common/providers/utils';
import { ErrorBody } from '../interfaces/error-body';
import { LogService } from '../../log/providers/log-service';

@Injectable()
export class ErrorsService {
  constructor(
    private readonly $log: LogService,
    private readonly $util: Utils,
  ) {
    return;
  }

  public generateErrorResponse(err: ErrorBody): ErrorResponse {
    return {
      status: err.status || 'error',
      code: err.code || HttpStatus.BAD_REQUEST,
      errorId: this.$util.getUUID(),
      message: err.message || 'Unknown Error',
      detail: err.detail || null,
    };
  }

  public handleError(error) {
    let errorMessage = 'Unknown error!';
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data.meta && error.response.data.meta.messages) {
        errorMessage = error.response.data.meta.messages.map(m => m.message).join(' ');
      }
    } else {
      errorMessage = `Error: ${error.status}<br>Message: ${error.message}`;
    }
    const status =
      error.status ||
      error.response.stats ||
      error.response.status ||
      error.response.data.statusCode ||
      HttpStatus.BAD_REQUEST;
    return this.throwErr({ status, code: error.code, message: errorMessage });
  }

  public throwErr(error: ErrorBody): void {
    const {
      status,
      code,
      message,
      detail,
      context,
    } = error;
    const err = { status, code, message, detail };
    this.$log.error(message, detail, context);
    throw new HttpException(this.generateErrorResponse(err), code || HttpStatus.BAD_REQUEST);
  }
}
