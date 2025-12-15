import { IsString } from "class-validator";
import { ResponseUserDTO } from "../../user/dto/response-user.dto";
import { User } from "../../user/models/user.model";
import { ApiProperty } from "@nestjs/swagger";

export class AuthUserResponseDTO extends ResponseUserDTO {
  @ApiProperty()
  @IsString()
  token: string;

  constructor(user: User, token: string) {
    super(user);
    this.token = token;
  }
}
