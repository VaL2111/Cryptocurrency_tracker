import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "../../user-core/interfaces/user-repository.interface";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(user: UserEntity): Promise<string> {
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get("secret_jwt"),
      expiresIn: this.configService.get("expire_jwt"),
    });
  }
}
