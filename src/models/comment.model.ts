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
  BelongsTo,
} from 'sequelize-typescript';
import Post from './post.model';
import User from './user.model';

@Table({
  modelName: 'Comment',
  tableName: 'comments',
})
export default class Comment extends Model<Comment> {
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

  @BelongsTo(() => Post, 'id')
  post: Post;

  @BelongsTo(() => User, 'id')
  user: User;
}
