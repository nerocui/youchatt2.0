import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import { requests as requests_sql } from '../sql';
import { RequestModel } from '../../types';

export class RequestRepository {

	private db: IDatabase<any>;
	private pgp: IMain;

	constructor(db: any, pgp: IMain) {
		this.db = db;
		this.pgp = pgp;
	}

	async create() {
		return this.db.none(requests_sql.create);
	}

	async drop() {
		return this.db.none(requests_sql.drop);
	}

	async empty() {
		return this.db.none(requests_sql.empty);
	}

	async add(request: RequestModel) {
		return this.db.one(requests_sql.add, this.requestModelToArray(request));
	}

	requestModelToArray(request: RequestModel) {
		return [
			request.id,
			request.from_user_id,
			request.to_user_id,
		];
	}

	async remove(id: string) {
		try {
			return this.db.result(requests_sql.remove, id, (r: IResult) => r.rowCount);
		} catch(e) {
			return 0;
		}
	}

	async findAll(from_user_id: string) {
		return this.db.any("SELECT * FROM requests WHERE from_user_id = $1", from_user_id);
	}
}
