import { AppConfig } from '../interfaces/app-config';
import { LogLevel } from '../../log/enums/log-level';

const { env } = process;
const NODE_ENV = env.NODE_ENV || 'dev';
const APP_ENV = env.APP_ENV || 'dev';

const appConfig = {
  appKeyPriv: env.APP_KEY_PRIV,
  appKeyPub: env.APP_KEY_PUB,

  app: {
    name: 'App Marketplace Fiber+ Micro-Service',
    description: 'App Marketplace API for servicing Fiber+',
    apiDescription:
      'These are the available APIs for use by the App Marketplace for Fiber+',
    version: '0.0.1',
  },

  apis: {},

  http: {
    timeout: 10000,
    maxRedirects: 5,
  },

  server: {
    port: env.PORT || 3000,
    env: env.APP_ENV || 'dev',
    smr_env: env.SMR_ENV || '1',
    databaseUrl: env.DATABASE_URL,
    environment: NODE_ENV || 'dev',
    isLocal: env.NODE_IS_LOCAL || env.NODE_IS_LOCAL === 'true',
    isProduction: process.env.APP_ENV === 'production',
  },

  timeout: 30000,

  defaultLoggingLevel: 'info',

  defaultLogLevel: {
    development: LogLevel.info,
    validation: LogLevel.info,
    staging: LogLevel.info,
    production: LogLevel.error,
  },

  logLevel: env.LOG_LEVEL as LogLevel,
};

export default (): AppConfig => ({
  ...appConfig,
});
