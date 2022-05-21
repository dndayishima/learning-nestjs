import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  getUsers(@Query('name') name: string): User[] {
    return this.usersService.findAll(name);
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  createUser(@Body() requestBody: CreateUserDto): User {
    return this.usersService.createUser(requestBody);
  }
}
