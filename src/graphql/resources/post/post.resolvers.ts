import { GraphQLResolveInfo } from 'graphql';
import * as graphqlFields from 'graphql-fields';
import { Transaction } from 'sequelize';

import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { PostInstance } from '../../../models/post.model';
import { handleError, throwError } from '../../../utils/utils';
import { AuthUser } from '../../../interfaces/AuthUserInterface';
import { compose } from '../../composable/composable.resolver';
import { authResolvers } from '../../composable/auth.resolver';
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';
import { RequestedFields } from '../../ast/RequestedFields';

export const postResolvers = {

  Post: {
    author: (post, args, {db, dataloaders: {userLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
      return userLoader
        .load({key: post.get('author'), info})
        .catch(handleError);
      //USING LOADER W/AST TO REDUCE QUERIES IN A TRANSACTION
    },
    comments: (post, {first=10, offset=0}, {db, requestedFields}: {db: DbConnection, requestedFields: RequestedFields}, info: GraphQLResolveInfo) => {
      return db.Comment
        .findAll({
          where: {post: post.get('id')},
          limit: first,
          offset: offset,
          attributes: requestedFields.getFields(info) //SPECIFYING SELECTION
        })
        .catch(handleError);
    }
  },

  Query: {
    posts: (parent, {first=10, offset=0}, {db, requestedFields}: {db: DbConnection, requestedFields: RequestedFields}, info: GraphQLResolveInfo) => {
      return db.Post
        .findAll({
          limit: first,
          offset: offset,
          attributes: requestedFields.getFields(info, {keep:['id'], exclude:['comments']})
        })
        .catch(handleError);
    },
    post: (parent, {id}, {db, requestedFields}: {db: DbConnection, requestedFields: RequestedFields}, info: GraphQLResolveInfo) => {
      id = parseInt(id);
      return db.Post
        .findByPk(id, {
          attributes: requestedFields.getFields(info, {keep:['id'], exclude:['comments']})
        })
        .then((post: PostInstance) => {
          throwError(!post, `Post with id ${id} not found!`);
          return post;
        })
        .catch(handleError);
    }
  },

  Mutation: {
    createPost: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
      input["author"] = authUser["id"];
      return db.sequelize.transaction((t: Transaction) => {
        return db.Post
          .create(input, {transaction: t});
      })
      .catch(handleError);
    }),
    updatePost: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
      id = parseInt(id);
      return db.sequelize.transaction((t: Transaction) => {
        return db.Post
          .findByPk(id)
          .then((post: PostInstance) => {
            throwError(!post, `Post with id ${id} not found!`);
            throwError(post.get('authorId') !== authUser["id"], `Unauthorized! You can only edit posts by yourself!`);
            input["author"] = authUser["id"];
            return post.update(input, {transaction: t});
          });
      })
      .catch(handleError);
    }),
    deletePost: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
      id = parseInt(id);
      return db.sequelize.transaction((t: Transaction) => {
        return db.Post
          .findByPk(id)
          .then((post: PostInstance) => {
            throwError(!post, `Post with id ${id} not found!`);
            throwError(post.get('authorId') !== authUser["id"], `Unauthorized! You can only delete posts by yourself!`);
            return post.destroy({transaction: t})
              // .then(post => !!post); // sequelize changes
          });
      })
      .catch(handleError);
    })
  }

};