// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env'], // Specify the path to your .env file
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
