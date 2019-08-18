/*
    Creates table Users.
*/
CREATE TABLE IF NOT EXISTS users
(
    id text PRIMARY KEY,
	email text NOT NULL UNIQUE,
    username text NOT NULL,
	first_name text NOT NULL,
	last_name text NOT NULL,
	initials text NOT NULL,
	profile_pic text NOT NULL
)

/*
	addColumn('_id', lf.Type.STRING).
	addColumn('username', lf.Type.STRING).
	addColumn('first_name', lf.Type.STRING).
	addColumn('last_name', lf.Type.STRING).
	addColumn('initials', lf.Type.STRING).
	addColumn('profile_pic', lf.Type.STRING).
	addPrimaryKey(['_id']);
*/
