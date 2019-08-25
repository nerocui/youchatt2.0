import { IExtensions } from '../db/repos';
import {IInitOptions, IDatabase, IMain} from 'pg-promise';
import * as algoliasearch from 'algoliasearch';
import * as express from 'express';

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
	to_user_id: string,
};

export type RelationshipModel = {
	user_id: string,
	friend_id: string,
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

