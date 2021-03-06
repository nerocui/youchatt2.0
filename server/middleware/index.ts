import * as cookieSession from 'cookie-session';
import * as passport from 'passport';
import { key } from '../config/api_key';

const useCookie = cookieSession({
	maxAge: 30*24*60*60*1000,
	keys: [key.cookieKey]
});

const initPassport = passport.initialize();
const passportSession = passport.session();

export default [
	useCookie,
	initPassport,
	passportSession,
];
