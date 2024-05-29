import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanBenefitDto } from './dto/create-plan-benefit.dto';
import { UpdatePlanBenefitDto } from './dto/update-plan-benefit.dto';

@Injectable()
export class PlanBenefitService {
  constructor(private prisma: PrismaService) {}

  create(createPlanBenefitDto: CreatePlanBenefitDto) {
    return this.prisma.planBenefit.create({ data: createPlanBenefitDto });
  }

  findAll() {
    return this.prisma.planBenefit.findMany();
  }

  findOne(id: number) {
    return this.prisma.planBenefit.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updatePlanBenefitDto: UpdatePlanBenefitDto) {
    return this.prisma.planBenefit.update({
      where: { id },
      data: updatePlanBenefitDto,
    });
  }

  remove(id: number) {
    return this.prisma.planBenefit.delete({ where: { id } });
  }
}
