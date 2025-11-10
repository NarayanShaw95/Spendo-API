// src/modules/goals/goal.module.ts
import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';

@Module({
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
