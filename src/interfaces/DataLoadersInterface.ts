import * as DataLoader from 'dataloader';

import { PostInstance } from '../models/PostModel';
import { UserInstance } from '../models/UserModel';
import { DataLoaderParam } from './DataLoaderParamInterface';

export interface DataLoaders {
  postLoader: DataLoader<DataLoaderParam<number>, PostInstance>;
  userLoader: DataLoader<DataLoaderParam<number>, UserInstance>;
};