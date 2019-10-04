CREATE TABLE IF NOT EXISTS readreceive
(
	seen_by_id text REFERENCES users (id) ON DELETE CASCADE,
	message_id text REFERENCES messages (id) ON DELETE CASCADE,
	seen_at timestamp NOT NULL
)
