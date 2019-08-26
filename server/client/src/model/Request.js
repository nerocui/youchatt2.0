import lf from 'lovefield';
import { schemaBuilder } from '../startup/db';
import { DB_CONFIG } from '../config/app';
import isOnline from 'is-online';
import Axios from 'axios';

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
		let db, Requests;
		try {
			db = await schemaBuilder.connect();
			Requests = db.getSchema().table(DB_CONFIG.REQUEST_DB_NAME);
		} catch(e) {
			Requests = await schemaBuilder.getSchema().table(DB_CONFIG.REQUEST_DB_NAME);
		}
		
		try {
			await db.insert().into(Requests).values(request);
		} catch(e) {
			console.log(e);
		}
	}

	static async readRequest(id) {
		const db = await schemaBuilder.connect();
		const Requests = db.getSchema().table(DB_CONFIG.REQUEST_DB_NAME);
		try {
			await db.update(Requests).set(Requests.read, true).where(Requests.id.eq(id));
		} catch(e) {
			console.log(e);
		}
		db.close();
	}

	static async getAllRequest(to_user_id) {
		const db = await schemaBuilder.connect();
		const Requests = db.getSchema().table(DB_CONFIG.REQUEST_DB_NAME);
		try {
			const requests = await db.select().from(Requests).where(Requests.to_user_id.eq(to_user_id));
			db.observe(requests, (changes) => console.log('Changes are: ', changes));
			db.close();
			return requests;
		} catch(e) {
			console.log(e);
			db.close();
			return [];
		}
	}
}
