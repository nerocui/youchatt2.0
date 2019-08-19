import lf from 'lovefield';
import { schemaBuilder } from '../startup/db';
import { DB_CONFIG } from '../config/app';

export default class Thread {
	constructor(id, created_at, updated_at, last_message) {
		this.id = id;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.last_message = last_message;
	}

	static async allFromDb() {
		const db = await schemaBuilder.connect();
		const Threads = db.getSchema().table(DB_CONFIG.THREAD_DB_NAME);
		const threads =  await db.select()
						   		 .from(Threads)
						   		 .orderBy(Threads.updated_at, lf.Order.DESC).exec() || [];
		return threads.map(thread => new Thread({...thread}));
	}
}
