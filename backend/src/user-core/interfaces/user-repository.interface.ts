export interface UserEntity {
  id: number;
  firstName: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  update(id: number, user: Partial<UserEntity>): Promise<UserEntity | null>;
  delete(id: number): Promise<boolean>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
