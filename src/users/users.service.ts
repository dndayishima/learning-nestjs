import { Injectable } from '@nestjs/common';
import { networkInterfaces } from 'os';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // fake data
  private users: User[] = [
    {
      id: 0,
      name: 'Tonton',
    },
    {
      id: 1,
      name: 'John',
    },
    {
      id: 2,
      name: 'Billy',
    },
    {
      id: 3,
      name: 'Corentin',
    },
  ];

  findAll(name?: string): User[] {
    if (name) {
      return this.users.filter((user) => user.name === name);
    }
    return this.users;
  }

  findById(userId: Number): User {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserDto };

    this.users.push(newUser);

    return newUser;
  }
}
