import lf from 'lovefield';
import { DB_CONFIG } from '../config/app';
import { db } from '../startup';
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
		const Profiles = db.getSchema().table(DB_CONFIG.PROFILE_DB_NAME);
		try {
			Axios.post('/api/users/set_message_token', null, {params: {id, message_token}})
				.then(res => {
					db.update(Profiles).set(Profiles.message_token, message_token).where(Profiles.id.eq(id)).exec();
				})
				.catch(e => {
					console.log(e);
				});
			
		} catch(e) {
			console.log(e);
		}
	}

	static async allowPermission(id) {
		const Profiles = db.getSchema().table(DB_CONFIG.PROFILE_DB_NAME);
		try {
			const tokenRow = await db.select(Profiles.message_token).from(Profiles).where(Profiles.id.eq(id)).exec();
			return tokenRow && tokenRow.length !== 0;
		} catch(e) {
			console.log(e);
		}
		return false;
	}

	static async getCurrentProfile() {
		const Profiles = db.getSchema().table(DB_CONFIG.PROFILE_DB_NAME);
		if (await isOnline()) {
			return Axios.get('/api/current_user')
				.then(async (res) => {
					const {
						email,
						first_name,
						id,
						initials,
						last_name,
						message_token,
						profile_pic,
						username,
					} = res.data;
					const profile = new Profile(id, username, first_name, last_name, initials, profile_pic, true, message_token);
					//set this to the current logged in user, return it
					const existingProfileRows = await db.select()
													.from(Profiles)
													.where(Profiles.id.eq(profile.id)).exec();
					if (!existingProfileRows || existingProfileRows.length === 0) {
						const update = await db.update(Profiles).set(Profiles.logged_in, false);
						const insert = await db.insert().into(Profiles).values(lf.bind(0));
						update.exec();
						insert.bind([[Profiles.createRow(profile)]]).exec();
					} else {
						await db.update(Profiles).set(Profiles.logged_in, false).exec();
						await db.update(Profiles).set(Profiles.logged_in, true).where(Profiles.id.eq(profile.id)).exec();
					}
					return profile;
				})
				.catch(err => {
					console.log("Is Online but Not Logged In", err);
				});
		} else {
			const loggedInUserRow = await db.select().from(Profiles).where(Profiles.logged_in.eq(true)).exec();
			if (!loggedInUserRow || loggedInUserRow.length === 0) {
				console.log("Not Logged In");
			}
			return loggedInUserRow[0];
		}
	}

	static async login(profile) {
		//should only be called with login to server or switch user
		const Profiles = db.getSchema().table(DB_CONFIG.PROFILE_DB_NAME);
		const loggedInProfile = Object.assign({}, profile, {logged_in: true});
		const existingProfile = await db.select()
										.from(Profiles)
										.where(Profiles.id.eq(loggedInProfile.id));
		if (!existingProfile) {
			await db.update(Profiles).set(Profile.logged_in, false).exec();
			const insert = await db.insert().into(Profiles).values(lf.bind(0));
			insert.bind([[Profiles.createRow(loggedInProfile)]]).exec();
		} else {
			await db.update(Profiles).set(Profile.logged_in, false).exec();
			await db.update(Profiles).set(Profile.logged_in, true).where(Profiles.id.eq(loggedInProfile.id)).exec();
		}
	}

	static async logout() {
		//should only be called with log out to server or switch user
		return Axios.get('/api/logout')
			.then(res => {
				console.log('Res from logout: ', res);
			})
			.catch(err => {
				console.log('Fail to call logout server: ', err);
			})
			.finally(() => {
				const Profiles = db.getSchema().table(DB_CONFIG.PROFILE_DB_NAME);
				db.update(Profiles).set(Profiles.logged_in, false).exec();
			});
	}
}
