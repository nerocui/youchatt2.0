CREATE TABLE IF NOT EXISTS moments
(
	id text PRIMARY KEY,
	creator_id text REFERENCES users (id) ON DELETE CASCADE
	created_at TIMESTAMP NOT NULL
)
