import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from '@spendo/config/app-config.service';

interface ApiResponse<T> {
  success: boolean;
  timestamp: string;
  data: T;
  meta: {
    company: string;
    version: string;
  };
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly appConfig: AppConfigService) {}

  intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(
        (data: T): ApiResponse<T> => ({
          success: true,
          timestamp: new Date().toISOString(),
          data,
          meta: {
            company: this.appConfig.companyName,
            version: this.appConfig.appVersion,
          },
        }),
      ),
    );
  }
}
