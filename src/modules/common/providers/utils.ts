import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class Utils {
  public isError(item) {
    return Object.prototype.toString.call(item) === '[object Error]';
  }

  public isObject(item) {
    return Object.prototype.toString.call(item) === '[object Object]';
  }

  public getUUID(): string {
    return uuidv4();
  }

  public getCurrentGMTTimeAsString(): string {
    const now = new Date();
    return now.toUTCString();
  }
}
