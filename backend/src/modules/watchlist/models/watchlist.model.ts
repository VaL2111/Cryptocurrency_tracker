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
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  name: string;

  @Column
  assetId: string;
}
