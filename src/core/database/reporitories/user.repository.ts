// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserEntity } from '@spendo/entities/user.entity';

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Create a new user.
   * Accepts any data that prisma.user.create accepts.
   */

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.create({ data });
    return new UserEntity(user);
  }

  /**
   * Find a user by email
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new UserEntity(user) : null;
  }

  /**
   * Find a user by ID
   */
  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? new UserEntity(user) : null;
  }

  /**
   * Find the first matching user
   */
  async findFirst(
    args?: Parameters<typeof this.prisma.user.findFirst>[0],
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst(args);
    return user ? new UserEntity(user) : null;
  }

  /**
   * Find multiple users
   */
  async findMany(
    args?: Parameters<typeof this.prisma.user.findMany>[0],
  ): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany(args);
    return users.map((u) => new UserEntity(u));
  }

  /**
   * Count users
   */
  async count(
    args?: Parameters<typeof this.prisma.user.count>[0],
  ): Promise<number> {
    return this.prisma.user.count(args);
  }

  /**
   * Update user by ID
   */
  async update(
    id: string,
    data: Parameters<typeof this.prisma.user.update>[0]['data'],
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({ where: { id }, data });
    return new UserEntity(user);
  }

  /**
   * Delete user by ID
   */
  async delete(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.delete({ where: { id } });
    return new UserEntity(user);
  }

  /**
   * Upsert user (create if not exists, otherwise update)
   */
  async upsert(
    args: Parameters<typeof this.prisma.user.upsert>[0],
  ): Promise<UserEntity> {
    const user = await this.prisma.user.upsert(args);
    return new UserEntity(user);
  }

  /**
   * Aggregate users (count, sum, avg, etc.)
   */
  async aggregate<T extends Parameters<typeof this.prisma.user.aggregate>[0]>(
    args: T,
  ) {
    return this.prisma.user.aggregate(args);
  }

  /**
   * Raw SQL query
   */
  async rawQuery<T = unknown>(query: string) {
    return this.prisma.$queryRaw<T>(query);
  }
}
