import * as http from 'http';

import app from './app';
import db from './db';
import { normalizePort, onError, onListening } from './utils/utils';

const server = http.createServer(app);
const port = normalizePort(process.env.PORT || 3000);
// const host = process.env.host || '0.0.0.0';

db['sequelize'].sync().then(() => {
  server.listen(port/*, host*/);
  server.on('error', onError(server));
  server.on('listening', onListening(server));
});

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
  console.info('Got SIGINT. Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
  console.info('Got SIGTERM. Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// shut down server
const shutdown = () => {
  server.close(function onServerClosed(err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
};
