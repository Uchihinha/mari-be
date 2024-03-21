import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanBenefitService } from './plan-benefit.service';
import { CreatePlanBenefitDto } from './dto/create-plan-benefit.dto';
import { UpdatePlanBenefitDto } from './dto/update-plan-benefit.dto';

@Controller('plan-benefit')
export class PlanBenefitController {
  constructor(private readonly planBenefitService: PlanBenefitService) {}

  @Post()
  create(@Body() createPlanBenefitDto: CreatePlanBenefitDto) {
    return this.planBenefitService.create(createPlanBenefitDto);
  }

  @Get()
  findAll() {
    return this.planBenefitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planBenefitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanBenefitDto: UpdatePlanBenefitDto) {
    return this.planBenefitService.update(+id, updatePlanBenefitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planBenefitService.remove(+id);
  }
}
