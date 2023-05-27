import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HashingService } from '../../../hashing/hashing.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../../users/schemas';
import { Model } from 'mongoose';
import { ConflictException } from '@nestjs/common';
import { SignUpCommand } from '../impl';
import { UserCreatedEvent } from '../../events/impl';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly hashingService: HashingService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly eventBus: EventBus
  ) {}
  async execute({ signUpInput }: SignUpCommand): Promise<User> {
    const findUserByEmail: User = await this.userModel.findOne({
      email: signUpInput.email,
    });
    if (findUserByEmail) {
      throw new ConflictException();
    }
    const user: UserDocument = new this.userModel({
      ...signUpInput,
      password: await this.hashingService.hash(signUpInput.password),
    });
    await user.save();
    this.eventBus.publish(new UserCreatedEvent(user));
    return user;
  }
}
