import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanBenefitDto } from './create-plan-benefit.dto';

export class UpdatePlanBenefitDto extends PartialType(CreatePlanBenefitDto) {}
