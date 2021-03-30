import * as path from 'path';
import parseDbUrl from 'parse-database-url';
import { Sequelize } from 'sequelize-typescript';

import { DbConnection } from './interfaces/DbConnectionInterface';

const env: string = process.env.NODE_ENV || 'development';
const DB_URL: string =
  process.env.DATABASE_URL ||
  'postgres://graphql:pass@db-docker:5432/graphql-dev';
let config = require(path.resolve(`${__dirname}/config/config.json`))[env];
let db: Object | null = null;

if (!db) {
  db = {};

  const defaultConfig = {
    models: [__dirname + '/models'],
    modelMatch: function (filename, member) {
      return (
        filename.substring(0, filename.indexOf('.model.')) ===
        member.toLowerCase()
      );
    },
  };

  config =
    env !== 'production'
      ? { ...defaultConfig, ...config }
      : {
          ...defaultConfig,
          ...parseDbUrl(DB_URL), // ! not thoroughly tested, may have error cases
          ...config,
        };

  // console.log(`DB CONFIG: ${JSON.stringify(config)}`);
  const sequelize: Sequelize = new Sequelize(
    config['database'],
    config['username'],
    config['password'],
    { ...config }
  );
  db['sequelize'] = sequelize;
}

export default <DbConnection>db;
