import { ErrorBody } from './error-body';

export interface ErrorResponse extends ErrorBody {
  errorId: string;
}
