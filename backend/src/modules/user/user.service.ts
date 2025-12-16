import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ResponseUserDTO } from "./dto/response-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { appError } from "../../common/constants/errors";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async createUser(dto: CreateUserDTO): Promise<ResponseUserDTO> {
    const hashedPassword = await this.hashPassword(dto.password);
    const user = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return new ResponseUserDTO(user);
  }

  async updateUser(id: number, dto: UpdateUserDTO): Promise<ResponseUserDTO> {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(dto, {
        where: { id },
        returning: true,
      });

    if (numberOfAffectedRows === 0) {
      throw new BadRequestException(appError.USER_NOT_FOUND);
    }

    return new ResponseUserDTO(updatedUser);
  }

  async deleteUser(id: number): Promise<boolean> {
    const deletedRows = await this.userRepository.destroy({ where: { id } });
    return deletedRows > 0;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
