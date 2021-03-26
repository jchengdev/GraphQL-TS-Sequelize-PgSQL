import * as path from 'path';
import parseDbUrl from 'parse-database-url';
import { Sequelize } from 'sequelize-typescript';

import { DbConnection } from './interfaces/DbConnectionInterface';

const env: string = process.env.NODE_ENV || 'development';
let config = require(path.resolve(`${__dirname}/config/config.json`))[env];
let db: Object | null = null;

if (!db) {
  db = {};

  const defaultConfig = {
    models: [__dirname + '/models'],
    modelMatch: (filename, member) => {
      return (
        filename.substring(0, filename.indexOf('.model.')) ===
        member.toLowerCase()
      );
    },
  };

  config =
    env !== 'production'
      ? Object.assign(defaultConfig, config)
      : Object.assign(
          defaultConfig,
          parseDbUrl(process.env.DATABASE_URL), // ! not thoroughly tested, may have error cases
          config
        );

  const sequelize: Sequelize = new Sequelize({ ...config });
  db['sequelize'] = sequelize;
}

export default <DbConnection>db;
