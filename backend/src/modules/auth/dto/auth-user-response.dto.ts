import { ApiProperty } from "@nestjs/swagger";
import { Watchlist } from "../../watchlist/models/watchlist.model";
import { type UserEntity } from "../../../user-core/interfaces/user-repository.interface";

export class AuthUserResponseDTO {
  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  watchlist: Watchlist[];

  @ApiProperty()
  token: string;

  constructor(user: UserEntity, token: string, watchlist: Watchlist[] = []) {
    const userCopy = { ...user };

    delete userCopy.password;

    this.user = userCopy;
    this.token = token;
    this.watchlist = watchlist;
  }
}
