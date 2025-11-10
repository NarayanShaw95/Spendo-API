// src/core/helpers/jwt.helper.ts
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@spendo/config/app-config.service';
import { UtilHelper } from './util.helper';

@Injectable()
export class JwtHelper {
  constructor(
    private readonly config: AppConfigService,
    private readonly utilHelper: UtilHelper,
  ) {}

  generateAccessToken(payload: object): string {
    const expiresIn: number = this.utilHelper.parseExpireTime(
      this.config.jwtExpiresIn,
    );
    return jwt.sign(payload, this.config.jwtSecret, { expiresIn });
  }

  generateRefreshToken(payload: object): string {
    const expiresIn: number = this.utilHelper.parseExpireTime(
      this.config.jwtRefreshExpiresIn,
    );
    return jwt.sign(payload, this.config.jwtRefreshSecret, { expiresIn });
  }

  verifyAccessToken(token: string): string | jwt.JwtPayload | null {
    try {
      return jwt.verify(token, this.config.jwtSecret);
    } catch {
      return null;
    }
  }

  verifyRefreshToken(token: string): string | jwt.JwtPayload | null {
    try {
      return jwt.verify(token, this.config.jwtRefreshSecret);
    } catch {
      return null;
    }
  }
}
