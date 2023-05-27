import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from '../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { REQUEST_USER_KEY } from '../../constants';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../users/schemas';
import { Model } from 'mongoose';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorators';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);

    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [ctx.getHandler(), ctx.getClass()]
    );
    if (isPublic) {
      return true;
    }
    const request = ctx.getContext().req;
    const token: string = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const { sub } = await this.jwtService.verifyAsync<{ sub: string }>(
        token,
        this.jwtConfiguration
      );
      request[REQUEST_USER_KEY] = await this.userModel.findById(sub);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request?.headers['authorization']?.split(' ') ?? [];
    return token;
  }
}
