import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  NotEmpty,
  Default,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

@Table({
  modelName: 'User',
  tableName: 'users',
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  password: string;

  @AllowNull(true)
  @Default(null)
  @Column
  photo: Buffer;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BeforeCreate
  static hashPassword(instance: User): void {
    const salt = genSaltSync();
    instance['password'] = hashSync(instance['password'], salt);
  }

  @BeforeUpdate
  static reHashPassword(instance: User): void {
    if (instance.changed('password')) {
      const salt = genSaltSync();
      instance['password'] = hashSync(instance['password'], salt);
    }
  }
}

Object.defineProperty(User.prototype, 'isPassword', {
  value: (
    encodedPassword: string,
    password: string
  ): boolean => {
    return compareSync(password, encodedPassword);
  },
  enumerable: false
});
