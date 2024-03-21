import { Module } from '@nestjs/common';
import { PlanBenefitService } from './plan-benefit.service';
import { PlanBenefitController } from './plan-benefit.controller';

@Module({
  controllers: [PlanBenefitController],
  providers: [PlanBenefitService],
})
export class PlanBenefitModule {}
