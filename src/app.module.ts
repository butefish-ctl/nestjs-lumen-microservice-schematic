import { Module } from '@nestjs/common';
import { HttpModule} from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import config from './modules/common/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    HealthModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('http.timeout'),
        maxRedirects: configService.get('http.maxRedirects'),
      }),
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
