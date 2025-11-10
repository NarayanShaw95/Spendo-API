import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppLogger extends ConsoleLogger {
  private readonly enableConsole: boolean;

  constructor(private readonly configService: ConfigService) {
    super();
    this.enableConsole =
      this.configService.get<boolean>('app.ENABLE_CONSOLE_LOG') ?? true;
  }

  log(message: string, context?: string): void {
    if (this.enableConsole) {
      super.log(message, context);
    }
  }

  error(message: string, stack?: string, context?: string): void {
    if (this.enableConsole) {
      super.error(message, stack, context);
    }
  }

  warn(message: string, context?: string): void {
    if (this.enableConsole) {
      super.warn(message, context);
    }
  }

  debug(message: string, context?: string): void {
    if (this.enableConsole) {
      super.debug(message, context);
    }
  }

  verbose(message: string, context?: string): void {
    if (this.enableConsole) {
      super.verbose(message, context);
    }
  }
}
