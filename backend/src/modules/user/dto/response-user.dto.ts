import { User } from "../models/user.model";

export class ResponseUserDTO {
  id: number;
  firstName: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id as number;
    this.firstName = user.firstName;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt as Date;
    this.updatedAt = user.updatedAt as Date;
  }
}
