import { User } from "../models/user.model";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
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
