import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas';
import { CqrsModule } from '@nestjs/cqrs';
import { HANDLERS } from './cqrs';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
  ],
  providers: [UsersResolver, UsersService, ...HANDLERS],
  exports: [UsersService, MongooseModule, ...HANDLERS],
})
export class UsersModule {}
