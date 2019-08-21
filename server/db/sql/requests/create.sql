CREATE TABLE IF NOT EXISTS requests
(
	id text PRIMARY KEY,
	to_user_id text REFERENCES users (id) ON DELETE CASCADE
)
