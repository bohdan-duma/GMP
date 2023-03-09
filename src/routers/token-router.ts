import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';
import {getUserByLogin} from '../service-layer/users/get-user-by-login';
import {tokenGenerateBodySchema} from '../utils/schema/token';

const tokenRouter = express.Router();
const validator = createValidator();

tokenRouter.post(
  '/',
  validator.body(tokenGenerateBodySchema),
  async (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY || '';
    const {login, password} = req.body;
    const user = await getUserByLogin(login);

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      res.status(401).send('Invalid login or password');
      return;
    }

    const data = {
      userId: user.id,
      login: user.login,
    };
    const token = jwt.sign(data, jwtSecretKey);

    res.send(token);
  }
);

export {tokenRouter};
