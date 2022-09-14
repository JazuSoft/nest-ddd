import { Test, TestingModule } from '@nestjs/testing';
import { UserUpdater } from './updater';

describe('Updater', () => {
  let provider: UserUpdater;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUpdater],
    }).compile();

    provider = module.get<UserUpdater>(UserUpdater);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
