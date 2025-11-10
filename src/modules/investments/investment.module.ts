// src/modules/investments/investment.module.ts
import { Module } from '@nestjs/common';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';

@Module({
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}
