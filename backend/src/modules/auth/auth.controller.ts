import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../user/dto/create-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";
import { ResponseUserDTO } from "../user/dto/response-user.dto";
import { AuthUserResponseDTO } from "./dto/auth-response.dto";
import { ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guards/jwt-guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: ResponseUserDTO })
  @Post("register")
  register(@Body() dto: CreateUserDTO): Promise<ResponseUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @ApiResponse({ status: 200, type: AuthUserResponseDTO })
  @Post("login")
  async login(@Body() dto: LoginUserDTO): Promise<AuthUserResponseDTO> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("test")
  test() {
    return true;
  }
}
