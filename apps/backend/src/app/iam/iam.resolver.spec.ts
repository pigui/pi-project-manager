import { Test, TestingModule } from '@nestjs/testing';
import { IamResolver } from './iam.resolver';

describe('IamResolver', () => {
  let resolver: IamResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IamResolver],
    }).compile();

    resolver = module.get<IamResolver>(IamResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
