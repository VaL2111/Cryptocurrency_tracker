import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { TokenModule } from "../token/token.module";
import { JwtStrategy } from "../../strategy/jwt-strategy";
import { WatchlistModule } from "../watchlist/watchlist.module";

@Module({
  imports: [UserModule, TokenModule, WatchlistModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
