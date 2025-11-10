// src/core/config/app-config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IAppConfig } from '@spendo/interfaces/app-config.interface';

@Injectable()
export class AppConfigService {
  private readonly config: IAppConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<IAppConfig>('config') as IAppConfig;
  }

  /** Direct property accessors for clarity */
  get env(): string {
    return this.config.ENV;
  }

  get db(): string {
    return this.config.DATABASE_URL;
  }

  get appName(): string {
    return this.config.APP_NAME;
  }

  get appVersion(): string {
    return this.config.APP_VERSION;
  }

  get companyName(): string {
    return this.config.COMPANY_NAME;
  }

  get port(): number {
    return this.config.PORT;
  }

  get enableConsoleLog(): boolean {
    return this.config.ENABLE_CONSOLE_LOG;
  }

  get enableSwagger(): boolean {
    return this.config.ENABLE_SWAGGER;
  }

  get corsOrigin(): string {
    return this.config.CORS_ORIGIN;
  }

  get apiUrl(): string {
    return this.config.API_URL;
  }
}
