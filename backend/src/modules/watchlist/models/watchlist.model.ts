import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../user/models/user.model";

@Table
export class Watchlist extends Model {
  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  declare name: string;

  @Column
  declare assetId: string;
}
