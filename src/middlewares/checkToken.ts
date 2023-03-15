import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export const checkTokenMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY || '';
  const jwtSecretKey = process.env.JWT_SECRET_KEY || '';

  try {
    const token = req.header(tokenHeaderKey);
    if (!token) {
      return res.status(401).send('No token provided');
    }
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      next();
      return;
    } else {
      return res.status(401).send('Failed to authenticate token');
    }
  } catch (error) {
    return res.status(401).send('Failed to authenticate token');
  }
};
