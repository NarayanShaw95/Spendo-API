/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/app/app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@spendo/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getHello() {
    return { message: 'Welcome to Spendo APIs 🚀' };
  }

  async healthCheck() {
    try {
      // Get database time
      const resultRaw: unknown =
        await this.prisma.$queryRawUnsafe('SELECT NOW();');

      if (!Array.isArray(resultRaw)) {
        throw new Error('Unexpected query result');
      }

      const result = resultRaw as { now: Date }[];

      // Additional details
      const dbTime = result?.[0]?.now ?? null;
      const uptime = process.uptime(); // server uptime in seconds
      const memoryUsage = process.memoryUsage(); // memory details

      // Return a ResponseWrapper object for interceptor
      return {
        data: {
          status: 'ok',
          dbTime,
          serverTime: new Date().toISOString(),
          uptimeSeconds: uptime,
          memoryUsage: {
            rss: memoryUsage.rss,
            heapTotal: memoryUsage.heapTotal,
            heapUsed: memoryUsage.heapUsed,
            external: memoryUsage.external,
          },
        },
        message: 'Health check successful',
      };
    } catch (error: unknown) {
      throw new Error('Database connection failed');
    }
  }
}
