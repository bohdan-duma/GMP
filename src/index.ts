import * as express from 'express';
import {userRouter} from './routers/users-router';

const app = express();

app.use(express.json());
app.use('/users', userRouter);

app.listen(7070, () => {
  console.log('Listening port 7070\nCheck http://localhost:7070/users/');
});
