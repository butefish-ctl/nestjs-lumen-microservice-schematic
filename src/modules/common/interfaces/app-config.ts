import { BaseConfig } from './base-config';

export interface AppConfig extends BaseConfig {
  defaultLogLevel: any;
  logLevel: any;
  apis: {};
  app: {
    name: string;
    description: string;
    apiDescription: string;
  };
  defaultLoggingLevel: string;
  http: {
    timeout: number;
    maxRedirects: number;
  };
  server: {
    port: string | number;
    env: string;
    databaseUrl: string;
    environment: string;
    isLocal: string | boolean;
    isProduction: string | boolean;
  };
  timeout: number;
}
