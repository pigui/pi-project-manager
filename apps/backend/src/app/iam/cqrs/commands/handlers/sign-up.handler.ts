import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpInput } from '../../../inputs';
import { HashingService } from '../../../hashing/hashing.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../../users/schemas';
import { Model } from 'mongoose';
import { ConflictException } from '@nestjs/common';
import { SignUpCommand } from '../impl';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly hashingService: HashingService,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}
  async execute({ signUpInput }: SignUpCommand): Promise<User> {
    const findUserByEmail: User = await this.userModel.findOne({
      email: signUpInput.email,
    });
    if (findUserByEmail) {
      throw new ConflictException();
    }
    const user = new this.userModel({
      ...signUpInput,
      password: await this.hashingService.hash(signUpInput.password),
    });

    await user.save();
    return user;
  }
}
