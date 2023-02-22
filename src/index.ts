import * as express from 'express';
import * as morgan from 'morgan';
import {groupRouter} from './routers/groups-router';
import {userRouter} from './routers/users-router';

morgan.token('type', function (req, res) {
  return req.headers['content-type'];
});

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
app.use('/users', userRouter);
app.use('/groups', groupRouter);

// Error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(
      JSON.stringify(
        {
          error: err,
          method: req.method,
          body: req.body,
          params: req.params,
          query: req.query,
        },
        null,
        2
      )
    );
    res.status(500).send('Something broke!');
  }
);

app.listen(7070, () => {
  console.log('Listening port 7070\nCheck http://localhost:7070/users/');
});

process.on('uncaughtException', err => {
  console.error(err);
});

process.on('unhandledRejection', reason => {
  console.error(reason);
});
