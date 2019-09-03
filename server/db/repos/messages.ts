import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import { messages as messages_sql } from '../sql';
import { MessageModel } from '../../types';

export class MessageRepository {
	private db: IDatabase<any>;
	private pgp: IMain;

	constructor(db: any, pgp: IMain) {
		this.db = db;
		this.pgp = pgp;
	}

	async create() {
		return this.db.none(messages_sql.create);
	}

	async drop() {
		return this.db.none(messages_sql.drop);
	}

	async empty() {
		return this.db.none(messages_sql.empty);
	}

	async add(message: MessageModel) {
		return this.db.one(messages_sql.add, this.messageModelToArray(message));
	}

	async getOneWithId(id: string) {
		return this.db.one('SELECT * FROM messages WHERE id=$1', id);
	}

	messageModelToArray(message: MessageModel) {
		return [
			message.id,
			message.content,
			message.sender_id,
			message.receiver_id,
			message.seen,	
		];
	}
}
