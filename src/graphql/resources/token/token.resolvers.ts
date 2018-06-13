import * as jwt from 'jsonwebtoken';

import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { UserInstance } from '../../../models/UserModel';
import { JWT_SECRET } from '../../../utils/utils';

export const tokenResolvers = {
  
  Mutation: {
    createToken: (parent, {email, password}, {db}: {db: DbConnection}) => {
      return db.User
        .findOne({
          where: {email: email},
          attributes: ['id', 'password']
        })
        .then((user: UserInstance) => {
          let errorMessage: string = 'Unauthorized, wrong email or password!';
          if(!user || !user.isPassword(user.get('password'), password)) throw new Error(errorMessage);
          
          const payload = {sub: user.get('id')};

          return {
            //run 'set JWT_SECRET=iron_man' on development environment cli
            //run 'set JWT_SECRET=jwt_test' on development environment cli
            token: jwt.sign(payload, JWT_SECRET)
          }
        });
    }
  }

};