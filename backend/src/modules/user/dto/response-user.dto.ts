import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../../user-core/interfaces/user-repository.interface";

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

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt as Date;
    this.updatedAt = user.updatedAt as Date;
  }
}
