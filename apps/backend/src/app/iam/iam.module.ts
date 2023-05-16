import { Module } from '@nestjs/common';
import { IamService } from './iam.service';
import { IamResolver } from './iam.resolver';
import { UsersModule } from '../users/users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { HANDLERS } from './cqrs';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { PubSubModule } from '../pub-sub/pub-sub.module';

@Module({
  imports: [
    UsersModule,
    CqrsModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PubSubModule,
  ],
  providers: [
    IamService,
    IamResolver,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    RefreshTokenIdsStorage,
    ...HANDLERS,
  ],
  exports: [...HANDLERS],
})
export class IamModule {}
