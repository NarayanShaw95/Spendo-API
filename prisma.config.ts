import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'src/core/database/prisma/schema.prisma',
  migrations: {
    path: 'src/core/database/prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
