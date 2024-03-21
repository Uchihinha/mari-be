import { Module } from '@nestjs/common';
import { TemplateCategoryService } from './template-category.service';
import { TemplateCategoryController } from './template-category.controller';

@Module({
  controllers: [TemplateCategoryController],
  providers: [TemplateCategoryService],
})
export class TemplateCategoryModule {}
