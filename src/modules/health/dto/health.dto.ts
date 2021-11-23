import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class HealthResponseDto {
  @ApiProperty({ description: 'Is the service up?' })
  @IsBoolean()
  up?: boolean;
}
