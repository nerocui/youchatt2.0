import * as express from 'express';
import { AppOption } from '../types';
import { ExtendedProtocol, SearchEngine } from '../types';

export default class App {
	private app: express.Application;
	private port: number;
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
		return this;
	}

	public addRoute(route: string, handler: express.RequestHandler) {
		this.app.use(route, handler);
		return this;
	}

	private initDB() {
		this.db.users.init();
		this.db.requests.create();
	}

	public init() {
		this.initDB();
		return this;
	}

	public run() {
		this.app.listen(this.port, function () {
			console.log('Example app listening on port 5000!');
		});
	}
}
