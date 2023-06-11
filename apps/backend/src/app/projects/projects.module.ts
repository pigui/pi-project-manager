import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { HANDLERS } from './cqrs';
import { DatabaseModule } from '../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { IamModule } from '../iam/iam.module';
import { ProjectsUserResolver } from './projects-user.resolver';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    CqrsModule,
    PubSubModule,
    IamModule,
  ],
  providers: [
    ProjectsService,
    ProjectsResolver,
    ...HANDLERS,
    ProjectsUserResolver,
  ],
  exports: [...HANDLERS],
})
export class ProjectsModule {}
