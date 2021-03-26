import * as DataLoader from 'dataloader';

import { PostInstance } from '../models/post.model';
import { UserInstance } from '../models/user.model';
import { DataLoaderParam } from './DataLoaderParamInterface';

export interface DataLoaders {
  postLoader: DataLoader<DataLoaderParam<number>, PostInstance>;
  userLoader: DataLoader<DataLoaderParam<number>, UserInstance>;
};