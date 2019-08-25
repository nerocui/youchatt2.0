import * as passport from 'passport';
import { UserModel, ExtendedProtocol } from '../types';
import googleStrategy from '../middleware/strategies/google';
import SearchEngine from './algolia';

export default function initPassport(searchEngine: SearchEngine, db: ExtendedProtocol) {
	passport.serializeUser(
		(user: UserModel, done: any) => {
			done(null, user.id);
		}
	);
	passport.deserializeUser(
		async (id: string, done: any) => {
			const user = await db.users.findById(id);
			done(null, user);
		}
	);
	passport.use(googleStrategy(searchEngine.userIndex, db));
}
