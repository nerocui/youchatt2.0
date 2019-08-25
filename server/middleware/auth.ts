import * as passport from 'passport';
import * as express from 'express';

export default class PassportAuth {
	private app: express.Application;
	private passport: passport.PassportStatic;
	
	constructor(app: express.Application) {
		this.app = app;
		this.passport = passport;
	}

	public addUserSerializer(handler: any) {
		this.passport.serializeUser(handler);
	}

	public addUserDeserializer(handler: any) {
		this.passport.deserializeUser(handler);
	}

	public addStrategy(strategy: passport.Strategy) {
		this.passport.use(strategy);
	}

	public authenticator(provider: string, option: any) {
		return this.passport.authenticate(provider, option);
	}

	public callbackHandler(provider: string) {
		return this.passport.authenticate(provider);
	}

	public init() {
		this.app.use(this.passport.initialize());
		this.app.use(this.passport.session());
	}
}
