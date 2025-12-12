import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PasswordHasher } from "../../../user-core/interfaces/password-hasher.interface";

@Injectable()
export class BcryptAdapter implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
