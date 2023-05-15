import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from '../impl';
import { HashingService } from '../../../hashing/hashing.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../../../../users/schemas';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../../../config/jwt.config';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from '../../../models';
import { randomUUID } from 'crypto';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    private readonly hashingService: HashingService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService
  ) {}
  async execute({ signInInput }: SignInCommand): Promise<AccessToken> {
    const { email, password } = signInInput;
    const user: User & {
      _id: Types.ObjectId;
    } = await this.userModel.findOne({
      email,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isEqual = await this.hashingService.compare(password, user.password);

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    return await this.generateTokens(user);
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
      this.signToken(
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
