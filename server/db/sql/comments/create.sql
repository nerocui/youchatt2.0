CREATE TABLE IF NOT EXISTS comments
(
	id text PRIMARY KEY,
	moment_id text REFERENCES moments (id) ON DELETE CASCADE,
	commenter_id text REFERENCES users (id) ON DELETE CASCADE,
	content text NOT NULL,
	created_at TIMESTAMP NOT NULL
)
