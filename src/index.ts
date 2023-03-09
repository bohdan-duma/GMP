import * as express from 'express';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import {groupRouter} from './routers/groups-router';
import {tokenRouter} from './routers/token-router';
import {userRouter} from './routers/users-router';
import {checkTokenMiddleware} from './middlewares/checkToken';
import {errorHandlerMiddleware} from './middlewares/errorHandler';
dotenv.config();

const app = express();

app.use(
  express.json(),
  // Logger
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      `body - ${JSON.stringify(req.body)}`,
      `params - ${JSON.stringify(req.params)}`,
      `query - ${JSON.stringify(req.query)}`,
    ].join(' ');
  })
);

// Routers
app.use('/token', tokenRouter);
app.use('/users', userRouter);
app.use('/groups', checkTokenMiddleware, groupRouter);

// Error handler
app.use(errorHandlerMiddleware);

app.listen(7070, () => {
  console.log('Listening port 7070\nCheck http://localhost:7070/users/');
});

process.on('uncaughtException', err => {
  console.error(err);
});

process.on('unhandledRejection', reason => {
  console.error(reason);
});
