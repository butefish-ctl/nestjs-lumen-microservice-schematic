import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from '../providers/log-service';
import { ConfigService } from '@nestjs/config';
import { Utils } from '../../common/providers/utils';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  $config = new ConfigService();
  $log = new LogService();
  $util = new Utils();

  constructor() {
    const appName = this.$config.get('app.name');
    this.$log.setContext(`${appName} Endpoint Interceptor`);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(e => {
        const message = this.$util.isError(e) && e.message ? e.message : this.$util.isObject(e) ? JSON.stringify(e) : e;
        const stack = this.$util.isError(e) && e.stack ? e.stack : null;
        this.$log.error(message, stack, LogInterceptor.name);

        return throwError(e);
      }),
      tap(r => {
        // request info
        // the same info gets passed before and after next()
        // otherwise, we should ideally put this before next() to catch the incoming request before handling it
        const requestInfo = this.getDataFromHttpRequest(context);

        // response info
        this.$log.log(
          JSON.stringify({ request: requestInfo, response: r }),
          LogInterceptor.name,
        );
      }),
    );
  }

  private getDataFromHttpRequest(context: ExecutionContext): any {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { url, method, body } = request;
    const httpInfo = {
      url,
      method,
      body,
      params: request['params'],
      query: request['query'],
    };
    return httpInfo;
  }
}
