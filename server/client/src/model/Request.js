import lf from 'lovefield';
import { DB_CONFIG } from '../config/app';
import { db } from '../startup';
import isOnline from 'is-online';
import Axios from 'axios';
import { setRequests } from '../action';

export default class Request {
	constructor(id, from_user_id, from_user_name, from_user_pic, to_user_id, read) {
		this.id = id;
		this.from_user_id = from_user_id;
		this.from_user_name = from_user_name;
		this.from_user_pic = from_user_pic;
		this.to_user_id = to_user_id;
		this.read = read;
	}

	static async saveRequest(request) {
		const Requests = db.getSchema().table(DB_CONFIG.REQUEST_DB_NAME);
		try {
			const insert = await db.insert().into(Requests).values(lf.bind(0));
			insert.bind([[Requests.createRow(request)]]).exec();
		} catch(e) {
			console.log(e);
		}
	}

	static async readRequest(id) {
		const Requests = db.getSchema().table(DB_CONFIG.REQUEST_DB_NAME);
		try {
			await db.update(Requests).set(Requests.read, true).where(Requests.id.eq(id)).exec();
		} catch(e) {
			console.log(e);
		}
	}


	/**
	 [{
		addedCount: 1, -> number
		index: 0, -> number
		object: [
			{//Request Object
				from_user_id,
				from_user_name,
				from_user_pic,
				id,
				read,
				to_user_id,
			},
			...
		],
		removed: [],
		type: 'splice',
		length: 1, -> number
		},
		...]
		*/
	static async getAllRequest(to_user_id) {
		const Requests = db.getSchema().table(DB_CONFIG.REQUEST_DB_NAME);
		const localRequests = await db.select().from(Requests).where(Requests.to_user_id.eq(to_user_id)).exec();
		if (await isOnline()) {
			try {
				return Axios.get('/api/request/all')
					.then(res => {
						const requests = res.data;
						return Request.mergeNewRequestsWithLocal(requests, localRequests);
					})
					.catch(e => {
						return localRequests;
					});
			} catch(e) {
				console.log(e);
				return [];
			}
		} else {
			return localRequests;
		}
	}

	static async acceptRequest(id) {
		const Requests = db.getSchema().table(DB_CONFIG.REQUEST_DB_NAME);
		const Contacts = db.getSchema().table(DB_CONFIG.USER_DB_NAME);
		if (await isOnline()) {
			try {
				return Axios.post('/api/request/accept', null, {params: {id}})
					.then(res => {
						db.delete().from(Requests).where(Requests.id.eq(id)).exec();
						const insert = db.insert().into(Contacts).values(lf.bind(0));
						//insert.bind([[Requests.createRow(request)]]).exec();
						insert.bind([[Contacts.createRow(res.data)]]).exec();
					})
					.catch(e => {
						throw e;
					});
			} catch(e) {
				console.log('Fail to accept request: ', e);
			}
		}
	}

	static async declineRequest(id) {
		const Requests = db.getSchema().table(DB_CONFIG.REQUEST_DB_NAME);
		if (await isOnline()) {
			try {
				return Axios.post('/api/request/decline', null, {params: {id}})
					.then(res => {
						db.delete().from(Requests).where(Requests.id.eq(id)).exec();
					})
					.catch(e => {
						throw e;
					});
			} catch(e) {
				console.log('Fail to decline request: ', e);
			}
		}
	}

	static mergeNewRequestsWithLocal(newRequests, localRequests) {
		return newRequests.map(r => {
			localRequests.forEach(l => {
				if (r.id === l.id) {
					return l;
				}
			});

		});
	}
}
