/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/core/database/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    if (process.env.ENABLE_CONSOLE_LOG) console.log('🟢 Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    if (process.env.ENABLE_CONSOLE_LOG) console.log('🔴 Database disconnected');
  }

  /**
   * Type-safe raw query helper
   */
  async queryRaw<T = unknown>(
    query: string,
    ...values: unknown[]
  ): Promise<T[]> {
    const raw: unknown = await this.$queryRawUnsafe(query, ...values);
    if (!Array.isArray(raw)) {
      throw new Error('Unexpected query result format');
    }

    return raw as T[];
  }
}
