export interface BaseConfig {
  server: {
    port: string | number;
    env: string;
  };
  timeout: number;
  defaultLoggingLevel: string;
}
