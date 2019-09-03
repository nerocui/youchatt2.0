import lf from 'lovefield';
import { DB_CONFIG } from '../config/app';
import { db } from '../startup';
import isOnline from 'is-online';
import Axios from 'axios';

export default class Contact {
	constructor(id, username, first_name, last_name, initials, profile_pic) {
		this.id = id;
		this.username = username;
		this.first_name = first_name;
		this.last_name = last_name;
		this.initials = initials;
		this.profile_pic = profile_pic;
	}

	static async getAllContacts(id) {
		const Contacts = db.getSchema().table(DB_CONFIG.USER_DB_NAME);
		const localContacts =  await db.select().from(Contacts).exec();
		if (await isOnline()) {
			try {
				return Axios.get('/api/friend/all')
					.then(res => {
						console.log('All Friend request res', res);
						return res.data.map(c => {
							const {
								id, username, first_name, last_name, initials, profile_pic
							} = c;
							return new Contact(id, username, first_name, last_name, initials, profile_pic);
						});
					})
					.catch(e => {
						console.log('Got error from contacts', e);
					});
			} catch(e) {
				console.log('Fail to fetch contacts:', e);
			}
		} else {
			console.log('In else');
			return localContacts;
		}
	}
}
