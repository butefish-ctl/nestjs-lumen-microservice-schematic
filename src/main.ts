import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LogService } from './modules/log/providers/log-service';
import { LogInterceptor } from './modules/log/interceptors/log-interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { apiCss, apiDesc } from './modules/common/config/swagger-description.config';

let app;
let $config: ConfigService;
let $log: LogService;
declare const module: any;

const initApiDocs = async () => {
  try {
    const options = new DocumentBuilder()
      .setTitle($config.get('app.name'))
      .setDescription(apiDesc)
      .setVersion($config.get('app.version'))
      .addTag('Health', 'Check uptime of the Fiber+ Micro-Service')
      .build();
    const doc = SwaggerModule.createDocument(app, options);
    const docOptions = { customCss: apiCss };
    SwaggerModule.setup('', app, doc, docOptions);
  } catch (e) {
    $log.error('There was an error creating the Swagger docs', JSON.stringify(e));
  }
};

const bootstrap = async () => {
  try {
    app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: new LogService(),
    });

    $config = await app.get(ConfigService);
    $log = await app.resolve(LogService);

    await initApiDocs();

    app.enableCors();
    app.useLogger($log);
    app.useGlobalInterceptors(new LogInterceptor());

    await app.listen($config.get('server.port') || 3000);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (e) {
    console.error('There was an error bootstrapping the app', JSON.stringify(e));
  }
}

bootstrap();
