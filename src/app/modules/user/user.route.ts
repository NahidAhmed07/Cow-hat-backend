import { Router } from 'express';
import { UserController } from './user.controller';

const UserRouter = Router();

UserRouter.post('/create-user', UserController.createUser);

UserRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

export default UserRouter;
