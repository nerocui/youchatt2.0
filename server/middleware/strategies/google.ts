import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { key } from '../../config/api_key';
import { UserModel, ExtendedProtocol } from '../../types';
import * as uniqid from 'uniqid';
import * as algoliasearch from 'algoliasearch';

const option = {
	clientID: key.googleClientId,
	clientSecret: key.googleClientSecret,
	callbackURL: '/auth/google/callback',
};

const handler = (index: algoliasearch.Index, db: ExtendedProtocol) => async (accessToken, refreshToken, profile, done) => {
	const existUser = await db.users.findByEmail(profile.emails[0].value);
	if (existUser) {
		console.log(existUser);
		done(null, existUser);
	} else {
		console.log('lets create a user');
		const user: UserModel = {
			id: uniqid(),
			email: profile.emails[0].value,
			username: profile.displayName,
			first_name: profile.name.givenName,
			last_name: profile.name.familyName,
			initials: profile.name.givenName[0] + profile.name.familyName[0],
			profile_pic: profile.photos[0].value,
			message_token: '',
		};
		db.users.add(user)
			.then(user => {
			console.log("Created user: ", user);
			index.addObject({
			objectID: user.id,
			...user
			});
			done(null, user);
		})
	}
}

export default function googleStrategy(index: algoliasearch.Index, db: ExtendedProtocol) {
	return new GoogleStrategy(option, handler(index, db));
}
