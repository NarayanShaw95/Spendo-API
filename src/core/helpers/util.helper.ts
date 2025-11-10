// src/core/helpers/util.helper.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilHelper {
  constructor() {}

  parseExpireTime(value: string): number {
    const match = /^(\d+)([smhd])$/.exec(value);
    if (!match) throw new Error(`Invalid expireIn format: ${value}`);

    const amount = Number(match[1]);
    const unit = match[2];

    switch (unit) {
      case 's':
        return amount;
      case 'm':
        return amount * 60;
      case 'h':
        return amount * 60 * 60;
      case 'd':
        return amount * 60 * 60 * 24;
      default:
        throw new Error(`Unknown time unit: ${unit}`);
    }
  }
}
