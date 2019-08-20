CREATE TABLE IF NOT EXISTS messages
(
	id text PRIMARY KEY,
	content text NOT NULL,
	sender_id text REFERENCES users (id) ON DELETE CASCADE,
	receiver_id text REFERENCES users (id) ON DELETE CASCADE,
	seen boolean NOT NULL
)
