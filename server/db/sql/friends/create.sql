CREATE TABLE IF NOT EXISTS friends
(
	user_id text REFERENCES users (id) ON DELETE CASCADE,
	friend_id text REFERENCES users (id) ON DELETE CASCADE
)
