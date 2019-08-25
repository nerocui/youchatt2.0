import { Router, Request, Response } from 'express';
import * as passport from 'passport';

export default class AuthRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
		this.router.get(
			'/google/callback', 
			passport.authenticate('google'),
			this.redirectToMain
		)
	}
	private redirectToMain(req: Request, res: Response) {
		res.redirect('/main');
	}
}
