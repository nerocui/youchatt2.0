import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {users as sql} from '../sql';

export class UsersRepository {

    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp; // library's root, if ever needed;

        // set-up all ColumnSet objects, if needed:
        //this.createColumnsets();
    }

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private db: IDatabase<any>;

    private pgp: IMain;

    // ColumnSet objects static namespace:
    private static cs: UserColumnsets;

    // Creates the table;
    async create() {
        return this.db.none(sql.create);
    }

    // Initializes the table with some user records, and return their id-s;
    async init() {
        await this.create();
        return this.db.map(sql.init, [], (row: { id: string }) => row.id);
    }

    // Drops the table;
    async drop() {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    async empty() {
        return this.db.none(sql.empty);
    }

    // Adds a new user, and returns the new object;
    async add(user: UserModel) {
        return this.db.one(sql.add, this.userModelToArray(user));
    }
 
    // Tries to delete a user by id, and returns the number of records deleted;
    async remove(id: number) {
        return this.db.result('DELETE FROM users WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a user from id;
    async findById(id: string) {
        return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', id);
    }

    // Tries to find a user from name;
    async findByUsername(username: string) {
        return this.db.oneOrNone('SELECT * FROM users WHERE username = $1', username);
    }

    // Tries to find a user from name;
    async findByEmail(email: string) {
        return this.db.oneOrNone('SELECT * FROM users WHERE email = $1', email);
    }

    // Returns all user records;
    async all() {
        return this.db.any('SELECT * FROM users');
    }

    // Returns the total number of users;
    async total() {
        return this.db.one('SELECT count(*) FROM users', [], (a: { count: number }) => +a.count);
	}
	
	userModelToArray(user: UserModel): Array<string> {
		return [
			user.id,
			user.email,
			user.username,
			user.first_name,
			user.last_name,
			user.initials,
			user.profile_pic,
		];
	}

    // example of setting up ColumnSet objects:
    private createColumnsets() {
        // create all ColumnSet objects only once:
        if (!UsersRepository.cs) {
            const helpers = this.pgp.helpers, cs: UserColumnsets = {};

            // Type TableName is useful when schema isn't default "public" ,
            // otherwise you can just pass in a string for the table name.
            const table = new helpers.TableName({table: 'user', schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id']);

            UsersRepository.cs = cs;
        }
    }

}

type UserColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet,
};

type UserModel = {
	id: string,
	email: string,
	username: string,
	first_name: string,
	last_name: string,
	initials: string,
	profile_pic: string,
};
