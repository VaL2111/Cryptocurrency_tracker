import { Column, Model, Table } from "sequelize-typescript";

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
}
