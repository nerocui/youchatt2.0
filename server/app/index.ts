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
app.addMiddleware(...middlewares);
const userRouter: UserRouter = new UserRouter(db);
const requestRouter: RequestRouter = new RequestRouter(db);
app.addRoute('/api', userRouter.router);
app.addRoute('/api', requestRouter.router);
app.init();
app.run();
