import { Test, TestingModule } from '@nestjs/testing';
import { PlanBenefitService } from './plan-benefit.service';

describe('PlanBenefitService', () => {
  let service: PlanBenefitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanBenefitService],
    }).compile();

    service = module.get<PlanBenefitService>(PlanBenefitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
