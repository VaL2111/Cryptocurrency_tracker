import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { UserController } from "./user.controller";
import { SequelizeUserRepository } from "./adapters/sequelize-user.repository";
import { BcryptAdapter } from "./adapters/bcrypt.adapter";
import { UserCoreService } from "../../user-core/user-core.service";

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    SequelizeUserRepository,
    BcryptAdapter,
    {
      provide: UserCoreService,
      useFactory: (repo: SequelizeUserRepository, hasher: BcryptAdapter) => {
        return new UserCoreService(repo, hasher);
      },
      inject: [SequelizeUserRepository, BcryptAdapter],
    },
  ],
  exports: [UserCoreService],
})
export class UserModule {}
