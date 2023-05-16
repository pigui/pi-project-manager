import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokensCommand } from '../impl';
import { JwtService } from '@nestjs/jwt';
import { Inject, UnauthorizedException } from '@nestjs/common';
import jwtConfig from '../../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import {
  InvalidatedRefreshTokenError,
  RefreshTokenIdsStorage,
} from '../../../refresh-token-ids.storage';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../../users/schemas';
import { Model, Types } from 'mongoose';
import { AccessToken } from '../../../models';
import { randomUUID } from 'crypto';

@CommandHandler(RefreshTokensCommand)
export class RefreshTokensHandler
  implements ICommandHandler<RefreshTokensCommand>
{
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}
  async execute({ resfreshToken }: RefreshTokensCommand): Promise<AccessToken> {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<{
        sub: string;
        refreshTokenId: string;
      }>(resfreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user: User & {
        _id: Types.ObjectId;
      } = await this.userModel.findById(sub);

      const isValid: boolean = await this.refreshTokenIdsStorage.validate(
        user._id.toString(),
        refreshTokenId
      );
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user._id.toString());
      } else {
        throw new Error('Refresh token is invalid');
      }

      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        // Take action: notify user that his refresh token might have been stolen?
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }

  async generateTokens(
    user: User & {
      _id: Types.ObjectId;
    }
  ) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<User>>(
        user._id.toString(),
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email }
      ),
      this.signToken<Partial<User> & { refreshTokenId: string }>(
        user._id.toString(),
        this.jwtConfiguration.refreshTokenTtl,
        {
          refreshTokenId,
        }
      ),
    ]);

    const accToken: AccessToken = new AccessToken();
    accToken.user = user;
    accToken.accessToken = accessToken;
    accToken.refreshToken = refreshToken;
    return accToken;
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      }
    );
  }
}
