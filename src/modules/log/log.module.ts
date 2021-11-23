import { forwardRef, Module } from '@nestjs/common';
import { LogService } from './providers/log-service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [forwardRef(() => CommonModule)],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
