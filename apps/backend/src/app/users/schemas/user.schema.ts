import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, uppercase: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  googleId: string;

  @Prop({ uppercase: true })
  firstName: string;

  @Prop({ uppercase: true })
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
