import { Test, TestingModule } from '@nestjs/testing';
import { UserCreator } from './creator';

describe('Creator', () => {
  let provider: UserCreator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCreator],
    }).compile();

    provider = module.get<UserCreator>(UserCreator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
