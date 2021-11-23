import { Module } from '@nestjs/common';
import { ErrorsService } from './providers/errors';
import { LogModule } from '../log/log.module';

@Module({
  imports: [LogModule],
  providers: [ErrorsService],
  exports: [ErrorsService],
})
export class ErrorsModule {}
