import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { WatchlistService } from "./watchlist.service";
import { WatchlistDTO } from "./dto/watchlist.dto";
import { JwtAuthGuard } from "../../guards/jwt-guard";
import { Watchlist } from "./models/watchlist.model";

@Controller("watchlist")
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  createAsset(
    @Body() assetDto: WatchlistDTO,
    @Req() request: { user: { id: number } },
  ): Promise<Watchlist> {
    const { id } = request.user;
    return this.watchlistService.createAsset(id, assetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(
    @Query("id") id: string,
    @Req() request: { user: { id: number } },
  ): Promise<boolean> {
    const { id: userId } = request.user;
    return this.watchlistService.deleteAsset(userId, +id);
  }
}
