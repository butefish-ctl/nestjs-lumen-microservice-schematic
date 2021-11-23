export interface ErrorBody {
  status: string;
  code: number;
  message: string;
  detail?: string;
  context?: string;
}
