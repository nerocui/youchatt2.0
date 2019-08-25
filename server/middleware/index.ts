import * as cookieSession from 'cookie-session';
import { key } from '../config/api_key';

const useCookie = cookieSession({
	maxAge: 30*24*60*60*1000,
	keys: [key.cookieKey]
});

export default [
	useCookie,
];
