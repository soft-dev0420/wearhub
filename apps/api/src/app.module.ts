import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI!, {
      dbName: process.env.MONGO_DB_NAME || 'wearhub_dev',
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
