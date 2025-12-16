import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Watchlist } from "./models/watchlist.model";
import { WatchlistDTO } from "./dto/watchlist.dto";

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: typeof Watchlist,
  ) {}

  async createAsset(userId: number, dto: WatchlistDTO): Promise<Watchlist> {
    const watchlist = {
      userId,
      name: dto.name,
      assetId: dto.assetId,
    };

    return this.watchlistRepository.create(watchlist);
  }
}
