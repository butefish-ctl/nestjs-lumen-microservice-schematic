import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LogModule } from '../log/log.module';
import { CommonService } from './providers/common-service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [forwardRef(() => LogModule), HttpModule],

  providers: [CommonService, ConfigService],

  exports: [CommonService],
})
export class CommonModule {}
