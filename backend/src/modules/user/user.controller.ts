import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
  NotFoundException,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../guards/jwt-guard";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { ResponseUserDTO } from "./dto/response-user.dto";
import { ApiResponse } from "@nestjs/swagger";
import { UserCoreService } from "../../user-core/user-core.service";
import { appError } from "../../common/constants/errors";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserCoreService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @Patch()
  async updateUser(
    @Body() updateDto: UpdateUserDTO,
    @Req() request: { user: { id: number } },
  ): Promise<ResponseUserDTO> {
    const { id } = request.user;

    const updatedUser = await this.userService.updateUser(id, updateDto);
    if (!updatedUser) {
      throw new NotFoundException(appError.USER_NOT_FOUND);
    }

    return new ResponseUserDTO(updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Req() request: { user: { id: number } }): Promise<boolean> {
    const { id } = request.user;
    return this.userService.deleteUser(id);
  }
}
