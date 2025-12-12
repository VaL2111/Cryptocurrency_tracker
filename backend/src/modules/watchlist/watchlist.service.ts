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
    const existAsset = await this.watchlistRepository.findOne({
      where: { userId, assetId: dto.assetId },
    });

    if (existAsset) {
      return existAsset;
    }

    const watchlist = {
      userId,
      name: dto.name,
      assetId: dto.assetId,
    };

    return this.watchlistRepository.create(watchlist);
  }

  async deleteAsset(userId: number, id: number): Promise<boolean> {
    const result = await this.watchlistRepository.destroy({
      where: {
        userId,
        id,
      },
    });

    return result > 0;
  }

  async getUserAssets(userId: number): Promise<Watchlist[]> {
    return this.watchlistRepository.findAll({
      where: { userId },
    });
  }
}
