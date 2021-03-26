const DataLoader = require('dataloader');

import { DbConnection } from '../../interfaces/DbConnectionInterface';
import { DataLoaders } from '../../interfaces/DataLoadersInterface';
import { PostLoader } from './PostLoader';
import { UserLoader } from './UserLoader';
import { RequestedFields } from '../ast/RequestedFields';
import { DataLoaderParam } from '../../interfaces/DataLoaderParamInterface';

export class DataLoaderFactory {

  constructor(
    private db: DbConnection,
    private requestedFields: RequestedFields
  ) {}

  getLoaders(): DataLoaders {
    return {
      postLoader: new DataLoader(
        (params: DataLoaderParam<number>[]) => PostLoader.batchPosts(this.db.Post, params, this.requestedFields),
        { cacheKeyFn: (param: DataLoaderParam<number[]>) => param["key"] }
      ),
      userLoader: new DataLoader(
        (params: DataLoaderParam<number>[]) => UserLoader.batchUsers(this.db.User, params, this.requestedFields),
        { cacheKeyFn: (param: DataLoaderParam<number[]>) => param["key"] }
      )
    };
  }
  
}