// src/core/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppConfigService } from '@spendo/config/app-config.service';

interface ApiErrorResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: null;
  meta: {
    timestamp: string;
    company: string;
    version: string;
  };
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly appConfig: AppConfigService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const excResponse = exception.getResponse();

      // Handle string or object messages
      if (typeof excResponse === 'string') {
        message = excResponse;
      } else if (
        typeof excResponse === 'object' &&
        excResponse !== null &&
        'message' in excResponse
      ) {
        // Safe extraction of message property
        const maybeMessage = (excResponse as { message?: unknown }).message;
        if (Array.isArray(maybeMessage)) {
          message = maybeMessage.join(', ');
        } else if (typeof maybeMessage === 'string') {
          message = maybeMessage;
        } else {
          message = 'An error occurred';
        }
      } else {
        message = 'An error occurred';
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    const apiError: ApiErrorResponse = {
      success: false,
      message,
      statusCode: status,
      data: null,
      meta: {
        timestamp: new Date().toISOString(),
        company: this.appConfig.companyName,
        version: this.appConfig.appVersion,
      },
    };

    response.status(status).json(apiError);
  }
}
