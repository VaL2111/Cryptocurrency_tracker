import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { CreateUserDTO } from "./dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async createUser(dto: CreateUserDTO) {
    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return {
      id: user.id as number,
      firstname: user.firstName,
      username: user.username,
      email: user.email,
    };
  }
}
