// src/modules/budgets/budget.module.ts
import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
