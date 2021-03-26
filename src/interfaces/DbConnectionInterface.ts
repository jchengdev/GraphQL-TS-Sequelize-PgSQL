import { Sequelize } from 'sequelize-typescript';

import { ModelsInterface } from './ModelsInterface';

export interface DbConnection extends ModelsInterface {
  sequelize: Sequelize;
}
