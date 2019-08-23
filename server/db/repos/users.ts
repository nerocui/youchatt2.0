import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {users as sql, friends as friends_sql} from '../sql';
import { UserModel, RelationshipModel } from '../../types';

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
        return this.create();
        //return this.db.map(sql.init, [], (row: { id: string }) => row.id);
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
    async remove(id: string) {
        return this.db.result('DELETE FROM users WHERE id = $1', id, (r: IResult) => r.rowCount);
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
    
    async addFriend(user_id: string, friend_id: string) {
        this.db.none(friends_sql.add, [user_id, friend_id]);
        return this.db.one('SELECT * FROM users WHERE id = $1', friend_id);
    }

    async getAllFriend(user_id: string) {
        const relationships: Array<RelationshipModel> = await this.db.any('SELECT * FROM friends WHERE user_id = $1 OR friend_id = $1', user_id);
        const friends = relationships.map(rel => {
            if (rel.friend_id === user_id) {
                return rel.user_id;
            } else {
                return rel.friend_id;
            }
        });
        return this.db.any('SELECT * FROM users WHERE id IN ($1:csv)', friends);
    }

    async removeFriend(user_id: string, friend_id: string) {
        try {
            this.db.none(friends_sql.remove, [user_id, friend_id]);
        } catch (e) {
            try {
                this.db.none(friends_sql.remove, [friend_id, user_id]);
            } catch (e) {
                console.log("Relationship does not exist, ", e);
                return null;
            }
        }
        //TODO: need to unify user relationship instead of user vs. friend
        return this.db.one('SELECT * FROM users WHERE id = $1', friend_id);
    }

    async updateMessageToken(user_id: string, message_token: string) {
        this.db.none('UPDATE users SET message_token = $1 WHERE id = $2', [message_token, user_id]);
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
            user.message_token,
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
