INSERT INTO friends(user_id, friend_id)
VALUE($1, $2)
RETURNING *
