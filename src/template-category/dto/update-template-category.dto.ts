import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateCategoryDto } from './create-template-category.dto';

export class UpdateTemplateCategoryDto extends PartialType(CreateTemplateCategoryDto) {}
