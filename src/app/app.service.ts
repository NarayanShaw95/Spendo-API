// src/app/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { message: 'Welcome to Spendo APIs 🚀' };
  }
}
