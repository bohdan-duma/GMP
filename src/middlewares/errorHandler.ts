import * as express from 'express';

export const errorHandlerMiddleware = (
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
};
