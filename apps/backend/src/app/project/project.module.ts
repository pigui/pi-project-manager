import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { HANDLERS } from './cqrs';
import { DatabaseModule } from '../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { IamModule } from '../iam/iam.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    CqrsModule,
    PubSubModule,
    IamModule,
  ],
  providers: [ProjectService, ProjectResolver, ...HANDLERS],
  exports: [...HANDLERS],
})
export class ProjectModule {}
