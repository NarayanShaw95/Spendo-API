// src/core/database/entities/user.entity.ts
import { Exclude } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { IUserEntity } from '@spendo/interfaces/user.interface';

export class UserEntity extends BaseEntity<IUserEntity> {
  @Exclude()
  password: string;
}
