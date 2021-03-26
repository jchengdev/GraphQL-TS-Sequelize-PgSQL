import express = require('express');
import { graphqlHTTP } from 'express-graphql';
import cors = require('cors');
import compression = require('compression');
import helmet = require('helmet');
import * as path from 'path';

import db from './db';
import schema from './graphql/schema';
import { extractJwtMiddleware } from './middlewares/extract-jwt.middleware';
import { DataLoaderFactory } from './graphql/dataloaders/DataLoaderFactory';
import { RequestedFields } from './graphql/ast/RequestedFields';

class App {

  public express: express.Application;
  private dataLoaderFactory: DataLoaderFactory;
  private requestedFields: RequestedFields;

  constructor() {
    this.express = express();
    this.init();
  }

  private init(): void {
    this.requestedFields = new RequestedFields();
    this.dataLoaderFactory = new DataLoaderFactory(db, this.requestedFields);
    this.middleware();
  }

  private middleware(): void {
    // this.express.use('/hello', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //   res.send({
    //     hello: 'Hello World!'
    //   });
    // }); //use includes GET and POST requests

    this.express.use(cors({
      origin: '*',
      methods: ['GET','POST'],
      allowedHeaders: ['Content-Type','Authorization','Accept-Encoding'],
      preflightContinue: false,
      optionsSuccessStatus: 204
    }));
    this.express.use(compression());
    this.express.use(helmet());

    this.express.use('/graphql', 
      extractJwtMiddleware(),

      (req, res, next) => {
        req["context"]["db"] = db;
        req["context"]["dataloaders"] = this.dataLoaderFactory.getLoaders();
        req["context"]["requestedFields"] = this.requestedFields;
        next();
      },
      
      graphqlHTTP((req) => ({
        schema: schema,
        graphiql: true, //process.env.NODE_ENV !== 'development',
        context: req["context"]
      }))
    );

    //DEVELOPER NOTES PAGE
    this.express.get('/about', function (req, res, next) {
      res.sendFile(path.join(__dirname+'/about.html'));
    });
    this.express.get('/', function (req, res, next) {
      res.sendFile(path.join(__dirname+'/help.html'));
    });
  }
}

export default new App().express;