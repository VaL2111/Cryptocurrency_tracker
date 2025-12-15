import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "../user/models/user.model";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(user: User): Promise<string> {
    const payload = {
      user: {
        id: user.id as number,
        email: user.email,
      },
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get("secret_jwt"),
      expiresIn: this.configService.get("expire_jwt"),
    });
  }
}
