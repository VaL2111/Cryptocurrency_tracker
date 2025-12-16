import { ResponseUserDTO } from "../../user/dto/response-user.dto";
import { User } from "../../user/models/user.model";
import { ApiProperty } from "@nestjs/swagger";
import { WatchlistResponseDTO } from "../../watchlist/dto/watchlist-response.dto";

export class AuthUserResponseDTO extends ResponseUserDTO {
  @ApiProperty()
  token: string;

  @ApiProperty()
  watchlist: WatchlistResponseDTO[];

  constructor(user: User, token: string) {
    super(user);
    this.token = token;
    this.watchlist = (user.watchlist || []).map(
      (item) => new WatchlistResponseDTO(item),
    );
  }
}
