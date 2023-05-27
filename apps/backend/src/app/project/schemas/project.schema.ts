import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas';
import { GraphqlTypes } from '@common/graphql';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ uppercase: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User;
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  users: [User];
  @Prop({
    default: GraphqlTypes.ProjectStatus.IN_PROGRESS,
  })
  status: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
