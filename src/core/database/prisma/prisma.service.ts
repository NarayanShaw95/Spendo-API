/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/core/database/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { AppConfigService } from '@spendo/config/app-config.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  //   constructor(private readonly appConfig: AppConfigService) {
  //     super({
  //       datasources: {
  //         db: {
  //           url: appConfig.db,
  //         },
  //       },
  //     });
  //   }

  async onModuleInit() {
    await this.$connect();
    // if (this.appConfig.enableConsoleLog) console.log('🟢 Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    // if (this.appConfig.enableConsoleLog)
    //   console.log('🔴 Database disconnected');
  }

  /**
   * Type-safe raw query helper
   */
  async queryRaw<T = unknown>(
    query: string,
    ...values: unknown[]
  ): Promise<T[]> {
    const result: unknown = await this.$queryRawUnsafe(query, ...values);
    return result as T[];
  }
}
