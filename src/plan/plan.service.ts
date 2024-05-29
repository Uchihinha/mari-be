import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  create(createPlanDto: CreatePlanDto) {
    return this.prisma.plan.create({ data: createPlanDto });
  }

  async findAll() {
    const [plans, planBenefits] = await Promise.all([
      await this.prisma.plan.findMany(),
      await this.prisma.planBenefit.findMany(),
    ]);

    return plans.map((plan) => {
      return {
        ...plan,
        benefits: planBenefits.filter((b) => b.planId === plan.id),
      };
    });
  }

  findOne(id: number) {
    return this.prisma.plan.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return this.prisma.plan.update({ where: { id }, data: updatePlanDto });
  }

  remove(id: number) {
    return this.prisma.plan.delete({ where: { id } });
  }
}
