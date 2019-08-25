import { Router, Request, Response } from 'express';
import { ExtendedProtocol } from '../types';

class UserRouter {
	public router: Router;
	private db: ExtendedProtocol;

	constructor(db: ExtendedProtocol) {
		this.db = db;
		this.router = Router();

		this.router.get('/current_user', this.getCurrentUser);
		this.router.get('/logout', this.logout);
		this.router.get('/friend/all', this.getAllFriends);
		this.router.post('/users/set_message_token', this.setUserMessageToken);
	}

	private getCurrentUser(req: Request, res: Response) {
		console.log('getting called: ', req.user);
		res.send(req.user);
	}
	
	private logout(req: Request, res: Response) {
		req.logout();
		res.send(req.user);
	}
	
	private async getAllFriends(req: Request, res: Response) {
		try {
			const users = await this.db.users.getAllFriend(req.user.id);
			res.status(200);
			res.send(users);
		} catch(e) {
			console.log('Error: ', e);
			res.status(500);
			res.send('Fail to get friends');
		}
	}
	
	private async setUserMessageToken(req: Request, res: Response) {
		const {id, message_token} = req.query;
		if (!(id && message_token)) {
			res.status(400);
			res.send('Bad Request');
		}
		try {
			this.db.users.updateMessageToken(id, message_token);
			res.status(200);
			res.send('message token set');
		} catch(e) {
			console.log('Error: ', e);
			res.status(500);
			res.send('Fail to get friends');
		}
	}
}

export default UserRouter;
