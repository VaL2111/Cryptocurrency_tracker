import { IsString } from "class-validator";
import { ResponseUserDTO } from "../../user/dto/response-user.dto";
import { User } from "../../user/models/user.model";

export class AuthUserResponseDTO extends ResponseUserDTO {
  @IsString()
  token: string;

  constructor(user: User, token: string) {
    super(user);
    this.token = token;
  }
}
