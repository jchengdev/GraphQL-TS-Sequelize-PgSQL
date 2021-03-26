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
import { Post } from './post.model';
import { User } from './user.model';

export interface CommentAttributes {
  id?: number;
  comment?: string;
  post?: number;
  user?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentInstance extends Comment {}

export type CommentModel = typeof Comment;

@Table({
  modelName: 'Comment',
  tableName: 'comments',
})
export class Comment extends Model<Comment> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  comment: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @ForeignKey(() => Post)
  @Column
  postId: number

  @BelongsTo(() => Post, 'id')
  post: Post;

  @ForeignKey(() => User)
  @Column
  userId: number

  @BelongsTo(() => User, 'id')
  user: User;
}
