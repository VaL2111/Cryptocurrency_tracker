import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDTO } from "../user/dto/create-user.dto";
import { appError } from "../../common/constants/errors";
import { ResponseUserDTO } from "../user/dto/response-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { TokenService } from "../token/token.service";
import { AuthUserResponseDTO } from "./dto/auth-user-response.dto";
import { UserCoreService } from "../../user-core/user-core.service";
import { UserEntity } from "../../user-core/interfaces/user-repository.interface";
import { WatchlistService } from "../watchlist/watchlist.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserCoreService,
    private readonly watchlistService: WatchlistService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDTO): Promise<ResponseUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) {
      throw new BadRequestException(appError.USER_EXIST);
    }

    const newUser = await this.userService.createUser(dto as UserEntity);

    return new ResponseUserDTO(newUser);
  }

  async loginUser(dto: LoginUserDTO): Promise<AuthUserResponseDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (!existUser) {
      throw new UnauthorizedException(appError.WRONG_DATA);
    }

    if (!existUser.password) {
      throw new UnauthorizedException(appError.WRONG_DATA);
    }

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );

    if (!validatePassword) {
      throw new UnauthorizedException(appError.WRONG_DATA);
    }

    const token = await this.tokenService.generateJwtToken(existUser);
    const userWatchlist = await this.watchlistService.getUserAssets(
      existUser.id,
    );

    return new AuthUserResponseDTO(existUser, token, userWatchlist);
  }
}
