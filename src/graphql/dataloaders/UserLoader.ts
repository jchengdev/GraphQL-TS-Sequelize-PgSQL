import { UserModel, UserInstance } from '../../models/user.model';
import { DataLoaderParam } from '../../interfaces/DataLoaderParamInterface';
import { RequestedFields } from '../ast/RequestedFields';

export class UserLoader {

  static batchUsers(User: UserModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<UserInstance[]> {
    let ids: number[] = params.map(param => param["key"]);

    return Promise.resolve(
      User.findAll({
        where: { id: [...ids]},
        attributes: requestedFields.getFields(params[0]["info"], {keep:['id'], exclude:['posts']})
      })
    );
  }
  
}