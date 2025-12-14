import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDTO } from "../user/dto/create-user.dto";
import { appError } from "../../common/constants/errors";
import { ResponseUserDTO } from "../user/dto/response-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUsers(dto: CreateUserDTO): Promise<ResponseUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) {
      throw new BadRequestException(appError.USER_EXIST);
    }
    return this.userService.createUser(dto);
  }

  async loginUser(dto: LoginUserDTO): Promise<ResponseUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) {
      throw new BadRequestException(appError.USER_NOT_EXIST);
    }

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) {
      throw new BadRequestException(appError.WRONG_DATA);
    }

    return new ResponseUserDTO(existUser);
  }
}
