import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthResponseDto } from './dto/health.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({
    summary: 'Get uptime information',
    description: 'Check if the service is up or not',
  })
  @ApiResponse({ status: 200, description: 'The service is up', type: HealthResponseDto })
  @ApiResponse({ status: 400, description: 'The service is down' })
  @ApiResponse({ status: 500, description: 'The service is having issues' })
  getHealth(): HealthResponseDto {
    return { up: true };
  }
}
