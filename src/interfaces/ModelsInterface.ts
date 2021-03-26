import CommentModel from '../models/comment.model';
import PostModel from '../models/post.model';
import UserModel from '../models/user.model';

export interface ModelsInterface {
  Comment: CommentModel;
  Post: PostModel;
  User: UserModel;
}