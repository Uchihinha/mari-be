import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/auth.guard';
import excludePasswordFromUser from 'src/helpers/exclude';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return excludePasswordFromUser(user, ['password']);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.remove(id);
  }
}
