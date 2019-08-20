CREATE TABLE IF NOT EXISTS likes
(
	id text PRIMARY KEY,
	moment_id text REFERENCES moments (id) ON DELETE CASCADE,
	liker_id text REFERENCES users (id) ON DELETE CASCADE,
	created_at TIMESTAMP NOT NULL
)
