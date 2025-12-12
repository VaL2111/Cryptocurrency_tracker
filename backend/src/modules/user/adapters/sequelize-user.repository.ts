import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import {
  UserEntity,
  UserRepository,
} from "../../../user-core/interfaces/user-repository.interface";

@Injectable()
export class SequelizeUserRepository implements UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(user: UserEntity): Promise<UserEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const created = await this.userModel.create(user as any);
    return created.get({ plain: true }) as UserEntity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ where: { email } });
    return user ? (user.get({ plain: true }) as UserEntity) : null;
  }

  async update(
    id: number,
    user: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const [, [updated]] = await this.userModel.update(user, {
      where: { id },
      returning: true,
    });

    return updated ? (updated.get({ plain: true }) as UserEntity) : null;
  }

  async delete(id: number): Promise<boolean> {
    const count = await this.userModel.destroy({ where: { id } });
    return count > 0;
  }
}
