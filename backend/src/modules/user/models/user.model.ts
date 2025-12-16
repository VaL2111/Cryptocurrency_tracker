import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Watchlist } from "../../watchlist/models/watchlist.model";

@Table
export class User extends Model {
  @Column
  declare firstName: string;

  @Column
  declare username: string;

  @Column
  declare email: string;

  @Column
  declare password: string;

  @HasMany(() => Watchlist, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  watchlist: Watchlist[];
}
