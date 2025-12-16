import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../../guards/jwt-guard";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { ResponseUserDTO } from "./dto/response-user.dto";
import { ApiResponse } from "@nestjs/swagger";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @Patch()
  async updateUser(
    @Body() updateDto: UpdateUserDTO,
    @Req() request: { user: { id: number } },
  ): Promise<ResponseUserDTO> {
    const { id } = request.user;

    return this.userService.updateUser(id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request: { user: { id: number } }): Promise<boolean> {
    const { id } = request.user;
    return this.userService.deleteUser(id);
  }
}
