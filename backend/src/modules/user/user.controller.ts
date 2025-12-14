import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ResponseUserDTO } from "./dto/response-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create-user")
  createUsers(@Body() dto: CreateUserDTO): Promise<ResponseUserDTO> {
    return this.userService.createUser(dto);
  }
}
