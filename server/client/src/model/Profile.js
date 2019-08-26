import lf from 'lovefield';
import { schemaBuilder } from '../startup/db';
import { DB_CONFIG } from '../config/app';
import isOnline from 'is-online';
import Axios from 'axios';

export default class Profile {
	constructor(id, username, first_name, last_name, initials, profile_pic, logged_in, message_token) {
		this.id = id;
		this.username = username;
		this.first_name = first_name;
		this.last_name = last_name;
		this.initials = initials;
		this.profile_pic = profile_pic;
		this.logged_in = logged_in;
		this.message_token = message_token;
	}

	static async setMessageToken(id, message_token) {
		const db = await schemaBuilder.connect();
		const Profiles = db.getSchema().table(DB_CONFIG.PROFILE_DB_NAME);
		try {
			Axios.post('/api/users/set_message_token', null, {params: {id, message_token}})
				.then(res => {
					db.update(Profiles).set(Profiles.message_token, message_token).where(Profiles.id.eq(id));
				})
				.catch(e => {
					console.log(e);
				})
				.finally(() => {
					db.close();
				});
			
		} catch(e) {
			console.log(e);
		}
	}

	static async allowPermission(id) {
		const db = await schemaBuilder.connect();
		const Profiles = db.getSchema().table(DB_CONFIG.PROFILE_DB_NAME);
		try {
			const token = await db.select(Profiles.message_token).from(Profiles).where(Profiles.id.eq(id));
			db.close();
			return token && token !== '';
		} catch(e) {
			console.log(e);
		}
		db.close();
		return false;
	}

	static async getCurrentProfile() {
		const db = await schemaBuilder.connect();
		const Profiles = db.getSchema().table(DB_CONFIG.PROFILE_DB_NAME);
		if (await isOnline()) {
			Axios.get('/api/current_user')
				.then(async (res) => {
					const profile = new Profile(...res.data, true);
					//set this to the current logged in user, return it
					const existingProfile = await db.select()
													.from(Profiles)
													.where(Profiles.id.eq(profile.id));
					if (!existingProfile) {
						await db.update(Profiles).set(Profiles.logged_in, false);
						await db.insert().into(Profiles).values(profile);
					} else {
						await db.update(Profiles).set(Profiles.logged_in, false);
						await db.update(Profiles).set(Profiles.logged_in, true).where(Profiles.id.eq(profile.id));
					}
					return profile;
				})
				.catch(err => {
					throw new Error("Not Logged In");
				})
				.finally(() => {
					db.close();
				});
		} else {
			const loggedInUser = await db.select().from(Profiles).where(Profiles.logged_in.eq(true));
			if (!loggedInUser) {
				throw new Error("Not Logged In");
			}
			db.close();
			return loggedInUser;
		}
	}

	static async login(profile) {
		//should only be called with login to server or switch user
		const db = await schemaBuilder.connect();
		const Profiles = db.getSchema().table(DB_CONFIG.PROFILE_DB_NAME);
		const loggedInProfile = Object.assign({}, profile, {logged_in: true});
		const existingProfile = await db.select()
										.from(Profiles)
										.where(Profiles.id.eq(loggedInProfile.id));
		if (!existingProfile) {
			await db.update(Profiles).set(Profile.logged_in, false);
			await db.insert().into(Profiles).values(loggedInProfile);
		} else {
			await db.update(Profiles).set(Profile.logged_in, false);
			await db.update(Profiles).set(Profile.logged_in, true).where(Profiles.id.eq(loggedInProfile.id));
		}
		db.close();
	}

	static async logout() {
		//should only be called with log out to server or switch user
		const db = await schemaBuilder.connect();
		const Profiles = db.getSchema().table(DB_CONFIG.PROFILE_DB_NAME);
		db.update(Profiles).set(Profile.logged_in, false);
	}
}
