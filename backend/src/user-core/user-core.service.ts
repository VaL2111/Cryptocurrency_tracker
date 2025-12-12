import {
  UserRepository,
  UserEntity,
} from "./interfaces/user-repository.interface";
import { PasswordHasher } from "./interfaces/password-hasher.interface";
import { appError } from "../common/constants/errors";

export class UserCoreService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    if (!user.password) {
      throw new Error(appError.PASSWORD_IS_REQUIRED);
    }
    const hashedPassword = await this.passwordHasher.hash(user.password);

    const newUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    delete newUser.password;
    return newUser;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }

  async updateUser(
    id: number,
    dto: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.userRepository.update(id, dto);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
