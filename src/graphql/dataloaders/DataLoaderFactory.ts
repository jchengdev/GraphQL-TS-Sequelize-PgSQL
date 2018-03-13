import * as DataLoader from 'dataloader';

import { DbConnection } from '../../interfaces/DbConnectionInterface';
import { DataLoaders } from '../../interfaces/DataLoadersInterface';
import { PostLoader } from './PostLoader';
import { UserLoader } from './UserLoader';
import { PostInstance } from '../../models/PostModel';
import { UserInstance } from '../../models/UserModel';
import { RequestedFields } from '../ast/RequestedFields';
import { DataLoaderParam } from '../../interfaces/DataLoaderParamInterface';

export class DataLoaderFactory {

  constructor(
    private db: DbConnection,
    private requestedFields: RequestedFields
  ) {}

  getLoaders(): DataLoaders {
    return {
      postLoader: new DataLoader<DataLoaderParam<number>, PostInstance>(
        (params: DataLoaderParam<number>[]) => PostLoader.batchPosts(this.db.Post, params, this.requestedFields),
        { cacheKeyFn: (param: DataLoaderParam<number[]>) => param["key"] }
      ),
      userLoader: new DataLoader<DataLoaderParam<number>, UserInstance>(
        (params: DataLoaderParam<number>[]) => UserLoader.batchUsers(this.db.User, params, this.requestedFields),
        { cacheKeyFn: (param: DataLoaderParam<number[]>) => param["key"] }
      )
    };
  }
  
}