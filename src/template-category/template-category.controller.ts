import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TemplateCategoryService } from './template-category.service';
import { CreateTemplateCategoryDto } from './dto/create-template-category.dto';
import { UpdateTemplateCategoryDto } from './dto/update-template-category.dto';

@Controller('template-category')
export class TemplateCategoryController {
  constructor(private readonly templateCategoryService: TemplateCategoryService) { }

  @Post()
  create(@Body() createTemplateCategoryDto: CreateTemplateCategoryDto) {
    return this.templateCategoryService.create(createTemplateCategoryDto);
  }

  @Get()
  findAll() {
    return this.templateCategoryService.findAll();
  }

  @Get('templates')
  getByCategories() {
    return this.templateCategoryService.getByCategories();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.templateCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateTemplateCategoryDto: UpdateTemplateCategoryDto) {
    return this.templateCategoryService.update(id, updateTemplateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.templateCategoryService.remove(id);
  }
}
