// src/core/database/entities/base.entity.ts
import { Expose } from 'class-transformer';

@Expose()
export abstract class BaseEntity<T extends object> {
  constructor(partial: T) {
    Object.assign(this, partial);
  }
}
