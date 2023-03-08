import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUserDto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const cryptPass = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        password: cryptPass,
      });
      await this.userRepository.save(user);

      delete user.password;
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id: ${id} not found`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.preload({
        id,
        ...updateUserDto,
      });

      if (!user) throw new NotFoundException(`User with id: ${id} not found`);

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    delete user.password;
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const { institutional_email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { institutional_email },
    });

    if (!user) {
      throw new BadRequestException(
        `The institutional email ${institutional_email} doesn't exist`,
      );
    } else if (!bcrypt.compare(password, user.password)) {
      throw new BadRequestException('The Password is incorrect');
    }
    return user;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    } else {
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error');
    }
  }
}
