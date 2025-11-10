// src/modules/auth/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '@spendo/dtos/register.dto';
import { UserEntity } from '@spendo/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  // async register(
  //   dto: RegisterDto,
  // ): Promise<{ user: UserEntity; token: string }> {
  //   const existing = await this.userRepo.findByEmail(dto.email);
  //   if (existing) throw new ConflictException('Email already registered.');

  //   const hashed = await bcrypt.has(dto.password, 10);
  //   const user = await this.userRepo.create({
  //     email: dto.email,
  //     name: dto.name,
  //     password: hashed,
  //   });

  //   const token = this.signToken;
  // }
}
