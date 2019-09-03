import { IExtensions } from '../db/repos';
import { IDatabase } from 'pg-promise';
import * as algoliasearch from 'algoliasearch';

export type UserModel = {
	id: string,
	email: string,
	username: string,
	first_name: string,
	last_name: string,
	initials: string,
	profile_pic: string,
	message_token: string,
};

export type RequestModel = {
	id: string,
	from_user_id: string,
	to_user_id: string,
};

export type RelationshipModel = {
	user_id: string,
	friend_id: string,
};

export type MessageModel = {
	id: string,
	content: string,
	sender_id: string,
	receiver_id: string,
	seen: boolean,
};

export type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

export type SearchEngine = {
	client: algoliasearch.Client,
	userIndex: algoliasearch.Index
};

export type SiteFeature = {
	id: string,
	toggle: boolean,
};

export type AppOption = {
	port: number,
	features: Array<SiteFeature>
};

