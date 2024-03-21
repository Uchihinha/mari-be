import { Test, TestingModule } from '@nestjs/testing';
import { PlanBenefitController } from './plan-benefit.controller';
import { PlanBenefitService } from './plan-benefit.service';

describe('PlanBenefitController', () => {
  let controller: PlanBenefitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanBenefitController],
      providers: [PlanBenefitService],
    }).compile();

    controller = module.get<PlanBenefitController>(PlanBenefitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
