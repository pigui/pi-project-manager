import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsUserResolver } from './projects-user.resolver';

describe('ProjectsUserResolver', () => {
  let resolver: ProjectsUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsUserResolver],
    }).compile();

    resolver = module.get<ProjectsUserResolver>(ProjectsUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
