// src/app/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from '@spendo/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('health')
  async healthCheck() {
    const result = await this.prisma.queryRaw<{ now: Date }>('SELECT NOW();');

    return {
      status: 'ok',
      dbTime: result?.[0]?.now ?? null,
    };
  }
}
