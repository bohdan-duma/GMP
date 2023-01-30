import * as express from 'express';
import {groupRouter} from './routers/groups-router';
import {userRouter} from './routers/users-router';

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.listen(7070, () => {
  console.log('Listening port 7070\nCheck http://localhost:7070/users/');
});
