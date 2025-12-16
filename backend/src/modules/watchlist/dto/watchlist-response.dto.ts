import { ApiProperty } from "@nestjs/swagger";
import { Watchlist } from "../models/watchlist.model";

export class WatchlistResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  assetId: string;

  @ApiProperty()
  createdAt: Date;

  constructor(watchlist: Watchlist) {
    this.id = watchlist.id as number;
    this.name = watchlist.name;
    this.assetId = watchlist.assetId;
    this.createdAt = watchlist.createdAt as Date;
  }
}
