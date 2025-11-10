// src/libs/interfaces/user.interface.ts

export interface IUserEntity {
  id: string;
  email: string;
  name?: string | null;
  createdAt: Date;
  updatedAt: Date;
  password: string;
}
