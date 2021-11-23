import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}
}
