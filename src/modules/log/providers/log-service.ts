import { ConsoleLogger, Inject, Injectable, Request, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createLogger, format, transports } from 'winston';
import { LogResponse } from '../interfaces/log-response';
import { LogMessageBody } from '../interfaces/log-message-body';
import { LogRequest } from '../interfaces/log-request';
import { LogLevel } from '../enums/log-level';
import appConfig from '../../common/config';
import { TransformableInfo } from 'logform';
import { Utils } from '../../common/providers/utils';

const logLevel = appConfig().logLevel || appConfig().defaultLogLevel[appConfig().server.env];

@Injectable({ scope: Scope.TRANSIENT })
export class LogService extends ConsoleLogger {
  private winstonLogger;
  private readonly $config = new ConfigService();
  private readonly $util = new Utils();

  constructor(@Inject(Request) private readonly request?: Request) {
    super();

    this.winstonLogger = createLogger({
      level: logLevel,
      transports: [
        new transports.Console({
          handleExceptions: true,
          format: format.combine(
            format((info, opts) => (info.private ? false : info))(),
            // format.colorize(),
            // format.label({ label: this.config.app.name }),
            // format.timestamp(),
            // format.simple(),
            format.printf(log => this.formatLogForSplunk(log)),
            // format.json(),
          ),
        }),
      ],
    });
  }

  public log(message: string, context: string): LogResponse {
    return this.addLog(LogLevel.info, { message, context });
  }

  public error(message: string | Error, trace?: string, context?: string): LogResponse {
    return this.addLog(LogLevel.error, {
      message: `${message}${trace ? ' - ' + trace : ''}`,
      context,
    });
  }

  public warn(message: string, context: string): LogResponse {
    return this.addLog(LogLevel.warn, { message, context });
  }

  public debug(message: string, context: string): LogResponse {
    return this.addLog(LogLevel.debug, { message, context });
  }

  public verbose(message: string, context: string): LogResponse {
    return this.addLog(LogLevel.verbose, { message, context });
  }

  private addLog(level: LogLevel, log): LogResponse {
    const logEntry = this.createLog(level, log);
    // const consoleOutput = this.formatLogForSplunk(logEntry);
    this.winstonLogger.log(level, logEntry);
    return this.generateLogResponse(logEntry);
  }

  private createLog(level: LogLevel, { message, context }: LogRequest): LogMessageBody {
    const id = this.$util.getUUID();
    const datetime = new Date(Date.now()).toISOString();
    return {
      id,
      level,
      service: appConfig().app.name,
      environment: appConfig().server.env,
      context,
      datetime,
      message,
    };
  }

  private generateLogResponse(response: LogMessageBody): LogResponse {
    const { id } = response;
    return {
      log: {
        id,
      },
    };
  }

  private formatLogForConsole(log: LogMessageBody): string {
    const { context, id, datetime, message } = log;
    return `[ ${context} | ${id} | ${datetime} ] \n${message}\n`;
  }

  private formatLogForSplunk(log: LogMessageBody | TransformableInfo): string {
    let logOutput = `${log.datetime} `;
    for (const k in log) {
      logOutput += `${k}="${log[k]}" `;
    }
    return logOutput;
  }
}
