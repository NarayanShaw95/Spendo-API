// src/app/app.module.ts
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@spendo/config/app.config';
import { envValidationSchema } from '@spendo/config/env.validation';
import { AppController } from './app.controller';
import { AppLogger } from '@spendo/logger/app.logger';
import { ResponseInterceptor } from '@spendo/interceptors/response.interceptor';
import { AppConfigService } from '@spendo/config/app-config.service';
import { AppService } from './app.service';
import { PrismaModule } from '@spendo/prisma/prisma.module';
import { HttpExceptionFilter } from '@spendo/common/filters/http-exception.filter';
import { AuthModule } from '@spendo/modules/auth/auth.module';
import { AdminModule } from '@spendo/modules/admin/admin.module';
import { BudgetModule } from '@spendo/modules/budgets/budget.module';
import { CategoryModule } from '@spendo/modules/categories/category.module';
import { GoalModule } from '@spendo/modules/goals/goal.module';
import { InvestmentModule } from '@spendo/modules/investments/investment.module';
import { ReportModule } from '@spendo/modules/reports/report.module';
import { TransactionModule } from '@spendo/modules/transactions/transaction.module';
import { UserModule } from '@spendo/modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: envValidationSchema,
    }),
    PrismaModule,
    AdminModule,
    AuthModule,
    BudgetModule,
    CategoryModule,
    GoalModule,
    InvestmentModule,
    ReportModule,
    TransactionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppLogger,
    AppConfigService,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
