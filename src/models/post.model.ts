import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.model';

export interface PostAttributes {
  id?: number;
  title?: string;
  content?: string;
  photo?: string;
  author?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostInstance extends Post {}

export type PostModel = typeof Post;

@Table({
  modelName: 'Post',
  tableName: 'posts',
})
export default class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content: string;

  @AllowNull(false)
  @Column
  photo: Buffer;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column
  authorId: number

  @BelongsTo(() => User, 'id')
  author: number;
}
