import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        if (configService.get('MONGO_MOCK')) {
          const mongod = await MongoMemoryServer.create();
          const uri = mongod.getUri();

          return { uri };
        }
        return { uri: configService.get('MONGO_URI') };
      },
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
