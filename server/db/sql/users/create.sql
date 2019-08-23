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
	profile_pic text NOT NULL,
	message_token text
)
