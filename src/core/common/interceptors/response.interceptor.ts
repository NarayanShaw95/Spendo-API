// src/core/common/interceptors/response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from '@spendo/config/app-config.service';
import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  meta: {
    timestamp: string;
    company: string;
    version: string;
  };
}

interface ResponseWrapper<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  constructor(private readonly appConfig: AppConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T | ResponseWrapper<T>>,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((response: T | ResponseWrapper<T>): ApiResponse<T> => {
        // Type guard to check if response is ResponseWrapper<T>
        const isWrapper = (obj: unknown): obj is ResponseWrapper<T> =>
          typeof obj === 'object' && obj !== null && 'data' in obj;

        // Extract data
        const data: T = isWrapper(response) ? response.data : response;

        // Extract message or use default
        const message: string = isWrapper(response)
          ? (response.message ?? 'Request successful')
          : 'Request successful';

        // Determine status code safely
        let statusCode: number;
        if (isWrapper(response) && typeof response.statusCode === 'number') {
          statusCode = response.statusCode;
        } else if (typeof res.statusCode === 'number') {
          statusCode = res.statusCode;
        } else {
          statusCode = 200;
        }

        return {
          success: true,
          message,
          statusCode,
          data,
          meta: {
            timestamp: new Date().toISOString(),
            company: this.appConfig.companyName,
            version: this.appConfig.appVersion,
          },
        };
      }),
    );
  }
}
