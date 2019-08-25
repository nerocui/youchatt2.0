import { Router, Request, Response } from 'express';
import { ExtendedProtocol, RequestModel, UserModel } from '../types';
import * as uniqid from 'uniqid';
import * as firebaseAdmin from 'firebase-admin';

class RequestRouter {
	public router: Router;
	private db: ExtendedProtocol;

	constructor(db: ExtendedProtocol) {
		this.db = db;
		this.router = Router();

		this.router.post('/request/add', this.addRequest);
		this.router.post('/request/accept', this.acceptRequest);
		this.router.post('/request/decline', this.declineRequest);
	}

	private async addRequest(req: Request, res: Response) {
		const {to_user_id} = req.query;
		if (!to_user_id) {
			res.status(400);
			res.send('Bad Request');
			return;
		}
		const request: RequestModel = {
			id: uniqid(),
			to_user_id,
		};
		const newRequest = await this.db.requests.add(request);
		try {
			const to_user: UserModel = await this.db.users.findById(to_user_id);
			const message = {
				data: {
					"url": `/request/${newRequest.id}?user_id=${to_user.id}&username=${to_user.username}`,
				},
				notification: {
					"title": `You got a friend request`,
					"body": `You got a friend request from ${to_user.username}`,
				},
				token: to_user.message_token
			};
			const newMessage = await firebaseAdmin.messaging().send(message);
			console.log('messages were sent: ', newMessage);
			res.status(201);
			res.send(newRequest);
		} catch(e) {
			console.log('Error: ', e);
			res.status(500);
			res.send('Fail to process request');
		}
	}

	private async acceptRequest(req: Request, res: Response) {
		const {id} = req.query;
		if (!id) {
			res.status(400);
			res.send('Bad Request');
		}
		let request: RequestModel;
		try {
			request = await this.db.requests.getOneWithId(id);
			const user: UserModel = await this.db.users.addFriend(req.user.id, request.to_user_id);
			this.db.requests.remove(id);
			res.status(201);
			res.send(user);
		} catch(e) {
			console.log('Error: ', e);
			res.status(500);
			res.send('Fail to process request');
		}
	}

	private async declineRequest(req: Request, res: Response) {
		const {id} = req.query;
		if (!id) {
			res.status(400);
			res.send('Bad Request');
		}
		try {
			this.db.requests.remove(id);
			res.status(201);
			res.send('Removed Request');
		} catch(e) {
			console.log('Error: ', e);
			res.status(500);
			res.send('Fail to process request');
		}
	}
}

export default RequestRouter;
