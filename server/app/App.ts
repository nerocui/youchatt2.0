import * as express from 'express';
import { AppOption } from '../types';
import PassportAuth from '../middleware/auth';
import { UserModel, ExtendedProtocol, SearchEngine } from '../types';
import googleStrategy from '../middleware/strategies/google';

export default class App {
	private app: express.Application;
	private port: number;
	private passportAuth: PassportAuth;
	private db: ExtendedProtocol;
	private searchEngine: SearchEngine;

	constructor(option: AppOption, db: ExtendedProtocol, searchEngine: SearchEngine) {
		this.app = express();
		this.port = option.port;
		this.db = db;
		this.searchEngine = searchEngine;
	}

	public addMiddleware(...handlers: express.RequestHandler[]) {
		this.app.use(...handlers);
	}

	public addRoute(route: string, handler: express.RequestHandler) {
		this.app.use(route, handler);
	}

	private initAuth(authStrategies: Array<any>) {
		const passportAuth = new PassportAuth(this.app);
		passportAuth.addUserSerializer(
		(user: UserModel, done: any) => {
			done(null, user.id);
		});
		passportAuth.addUserDeserializer(
		async (id: string, done: any) => {
			this.db.users.findById(id)
				.then(user => {
				done(null, user);
				});
			}
		);
		for (let i = 0; i < authStrategies.length; i++) {
			passportAuth.addStrategy(authStrategies[i]);
			//passportAuth.addStrategy(googleStrategy(index));
		}
		passportAuth.init();
		this.app.get('/auth/google', passportAuth.authenticator('google', {scope: ['profile', 'email']}));
		this.app.get(
			'/auth/google/callback',
			passportAuth.callbackHandler('google'),
			(req, res) => {
				res.redirect('/main');
			}
		);
		this.passportAuth = passportAuth;
	}

	private initDB() {
		this.db.users.init();
		this.db.requests.create();
	}

	public init() {
		this.initDB();
		this.initAuth([googleStrategy(this.searchEngine.userIndex, this.db)]);

	}

	public run() {
		this.app.listen(this.port, function () {
			console.log('Example app listening on port 5000!');
		});
	}
}
