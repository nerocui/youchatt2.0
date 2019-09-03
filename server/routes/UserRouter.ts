import { Router, Request, Response } from 'express';
import { db } from '../db';

class UserRouter {
	public router: Router;

	constructor() {
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
			const users = await db.users.getAllFriend(req.user.id);
			const friends = users.map(user => {
				const {
					id, username, first_name, last_name, initials, profile_pic
				} = user;
				return {
					id, username, first_name, last_name, initials, profile_pic
				};
			})
			console.log('Getting all friends: ', friends);
			res.status(200);
			res.send(friends);
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
			db.users.updateMessageToken(id, message_token);
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
