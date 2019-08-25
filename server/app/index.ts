import App from './App';
import UserRouter from '../routes/UserRouter';
import RequestRouter from '../routes/RequestRouter';
import initService, { searchEngine } from '../services';
import middlewares from '../middleware';
import { db } from '../db';
import { AppOption } from '../types';

initService();
const appOption: AppOption = {
  port: 5000,
  features: [],
};
const app: App = new App(appOption, db, searchEngine);
const userRouter: UserRouter = new UserRouter(db);
const requestRouter: RequestRouter = new RequestRouter(db);
app.addMiddleware(...middlewares)
   .addRoute('/api', userRouter.router)
   .addRoute('/api', requestRouter.router)
   .init()
   .run();

