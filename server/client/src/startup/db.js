import { DB_CONFIG } from '../config/app';
import lf from 'lovefield';

export function dbStartUp(schemaBuilder) {
	schemaBuilder.createTable(DB_CONFIG.REQUEST_DB_NAME)
		.addColumn('id', lf.Type.STRING)
		.addColumn('from_user_id', lf.Type.STRING)
		.addColumn('from_user_name', lf.Type.STRING)
		.addColumn('from_user_pic', lf.Type.STRING)
		.addColumn('to_user_id', lf.Type.STRING)
		.addColumn('read', lf.Type.BOOLEAN)
		.addPrimaryKey(['id']);

	schemaBuilder.createTable(DB_CONFIG.USER_DB_NAME)
		.addColumn('id', lf.Type.STRING)
		.addColumn('username', lf.Type.STRING)
		.addColumn('first_name', lf.Type.STRING)
		.addColumn('last_name', lf.Type.STRING)
		.addColumn('initials', lf.Type.STRING)
		.addColumn('profile_pic', lf.Type.STRING)
		.addPrimaryKey(['id']);

	schemaBuilder.createTable(DB_CONFIG.PROFILE_DB_NAME)
		.addColumn('id', lf.Type.STRING)
		.addColumn('username', lf.Type.STRING)
		.addColumn('first_name', lf.Type.STRING)
		.addColumn('last_name', lf.Type.STRING)
		.addColumn('initials', lf.Type.STRING)
		.addColumn('profile_pic', lf.Type.STRING)
		.addColumn('logged_in', lf.Type.BOOLEAN)
		.addColumn('message_token', lf.Type.STRING)
		.addPrimaryKey(['id']);
	

	schemaBuilder.createTable(DB_CONFIG.THREAD_DB_NAME)
		.addColumn('id', lf.Type.STRING)
		.addColumn('created_at', lf.Type.DATE_TIME)
		.addColumn('updated_at', lf.Type.DATE_TIME)
		.addColumn('last_message', lf.Type.STRING)
		.addPrimaryKey(['id']);

	schemaBuilder.createTable(DB_CONFIG.THREAD_USER_REL_DB_NAME)
		.addColumn('thread_id', lf.Type.STRING)
		.addColumn('user_id', lf.Type.STRING)
		.addForeignKey('fk_threadId', {
			local: 'thread_id',
			ref: `${DB_CONFIG.THREAD_DB_NAME}.id`,
			action: lf.ConstraintAction.CASCADE,
			timing: lf.ConstraintTiming.IMMEDIATE
		})
		.addForeignKey('fk_userId', {
			local: 'user_id',
			ref: `${DB_CONFIG.USER_DB_NAME}.id`,
			action: lf.ConstraintAction.CASCADE,
			timing: lf.ConstraintTiming.IMMEDIATE
		})
		.addIndex('index_thread_id', ['thread_id'], false);


	schemaBuilder.createTable(DB_CONFIG.THREAD_USER_REL_DEL_DB_NAME)
		.addColumn('thread_id', lf.Type.STRING)
		.addColumn('user_id', lf.Type.STRING)
		.addForeignKey('fk_threadId', {
			local: 'thread_id',
			ref: `${DB_CONFIG.THREAD_DB_NAME}.id`,
			action: lf.ConstraintAction.CASCADE,
			timing: lf.ConstraintTiming.IMMEDIATE
		})
		.addForeignKey('fk_user_id', {
			local: 'user_id',
			ref: `${DB_CONFIG.USER_DB_NAME}.id`,
			action: lf.ConstraintAction.CASCADE,
			timing: lf.ConstraintTiming.IMMEDIATE
		})
		.addIndex('index_thread_id', ['thread_id'], false);


	schemaBuilder.createTable(DB_CONFIG.MESSAGE_THREAD_REL_DB_NAME)
		.addColumn('message_id', lf.Type.STRING)
		.addColumn('thread_id', lf.Type.STRING)
		.addForeignKey('fk_message_id', {
			local: 'message_id',
			ref: `${DB_CONFIG.MESSAGE_DB_NAME}.id`,
			action: lf.ConstraintAction.CASCADE,
			timing: lf.ConstraintTiming.IMMEDIATE
		})
		.addForeignKey('fk_thread_id', {
			local: 'thread_id',
			ref: `${DB_CONFIG.THREAD_DB_NAME}.id`,
			action: lf.ConstraintAction.CASCADE,
			timing: lf.ConstraintTiming.IMMEDIATE
		})
		.addIndex('indexThread_id', ['thread_id'], false);


	schemaBuilder.createTable(DB_CONFIG.MESSAGE_DB_NAME)
		.addColumn('id', lf.Type.STRING)
		.addColumn('read_by', lf.Type.STRING)
		.addColumn('content', lf.Type.STRING)
		.addColumn('sent_at', lf.Type.DATE_TIME)
		.addPrimaryKey(['id'])
		.addIndex('index_sent_at', ['sent_at'], false, lf.Order.DESC);


	schemaBuilder.createTable(DB_CONFIG.MESSAGE_USER_REL_DB_NAME)
		.addColumn('message_id', lf.Type.STRING)
		.addColumn('user_id', lf.Type.STRING)
		.addForeignKey('fk_message_id', {
			local: 'message_id',
			ref: `${DB_CONFIG.MESSAGE_DB_NAME}.id`,
			action: lf.ConstraintAction.CASCADE,
			timing: lf.ConstraintTiming.IMMEDIATE
		})
		.addForeignKey('fk_user_id', {
			local: 'user_id',
			ref: `${DB_CONFIG.USER_DB_NAME}.id`,
			action: lf.ConstraintAction.CASCADE,
			timing: lf.ConstraintTiming.IMMEDIATE
		})
		.addIndex('index_message_id', ['message_id'], false);
}

