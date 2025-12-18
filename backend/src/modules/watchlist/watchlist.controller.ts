import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { WatchlistService } from "./watchlist.service";
import { WatchlistDTO } from "./dto/watchlist.dto";
import { JwtAuthGuard } from "../../guards/jwt-guard";
import { WatchlistResponseDTO } from "./dto/watchlist-response.dto";
import { ApiResponse } from "@nestjs/swagger";

@Controller("watchlist")
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiResponse({ status: 201, type: WatchlistResponseDTO })
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createAsset(
    @Body() assetDto: WatchlistDTO,
    @Req() request: { user: { id: number } },
  ): Promise<WatchlistResponseDTO> {
    const { id } = request.user;
    const asset = await this.watchlistService.createAsset(id, assetDto);

    return new WatchlistResponseDTO(asset);
  }

  @ApiResponse({ status: 200 })
  @HttpCode(200)
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
