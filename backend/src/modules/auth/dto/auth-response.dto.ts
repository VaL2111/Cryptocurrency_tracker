import { IsString } from "class-validator";
import { ResponseUserDTO } from "../../user/dto/response-user.dto";
import { User } from "../../user/models/user.model";
import { ApiProperty } from "@nestjs/swagger";
import { Watchlist } from "../../watchlist/models/watchlist.model";

export class AuthUserResponseDTO extends ResponseUserDTO {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  watchlist: Watchlist[];

  constructor(user: User, token: string) {
    super(user);
    this.token = token;
    this.watchlist = user.watchlist || [];
  }
}
