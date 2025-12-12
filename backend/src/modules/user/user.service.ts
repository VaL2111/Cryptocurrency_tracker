import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { CreateUserDTO } from "./dto";
import { appError } from "../../common/errors";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserDTO) {
    const existUser = await this.findUserByEmail(dto.email);
    if (existUser) {
      throw new BadRequestException(appError.USER_EXIST);
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return {
      id: user.id as number,
      firstName: dto.firstName,
      username: dto.username,
      email: dto.email,
      createdAt: user.createdAt as Date,
      updatedAt: user.updatedAt as Date,
    };
  }
}
