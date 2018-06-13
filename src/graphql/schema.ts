import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { Query } from './query';
import { Mutation } from './mutation';

import { commentTypes } from './resources/comment/comment.schema';
import { postTypes } from './resources/post/post.schema';
import { tokenTypes } from './resources/token/token.schema';
import { userTypes } from './resources/user/user.schema';

import { commentResolvers } from './resources/comment/comment.resolvers';
import { postResolvers } from './resources/post/post.resolvers';
import { tokenResolvers } from './resources/token/token.resolvers';
import { userResolvers } from './resources/user/user.resolvers';

// const resolvers = {
//   Query: {
//     users
//     user
//     posts
//     post
//     commentByPost
//   }
// };

const resolvers = merge(
  commentResolvers,
  postResolvers,
  tokenResolvers,
  userResolvers
);

// const users: any[] = [
//   {
//     id: 1,
//     name: 'Jon',
//     email: 'jon@email.com'
//   },
//   {
//     id: 2,
//     name: 'Dany',
//     email: 'dany@email.com'
//   }
// ];

// const typeDefs = `
//   type User {
//     id: ID!
//     name: String!
//     email: String!
//   }

//   type Query {
//     allUsers: [User!]!
//   }

//   type Mutation {
//     createUser(name: String!, email: String!): User
//   }
// `;

// const resolvers = {
//   User: {
//     id: (user) => user["id"],
//     name: (user) => user["name"],
//     email: (user) => user["email"],
//   }, //trivial resolver
//   Query: {
//     allUsers: () => users
//   },
//   Mutation: {
//     createUser: (parent, args) => {
//       const newUser = Object.assign({id: users.length+1}, args);
//       users.push(newUser);
//       return newUser;
//     }
//   }
// };

const SchemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    commentTypes,
    postTypes,
    tokenTypes,
    userTypes
  ],
  resolvers
});