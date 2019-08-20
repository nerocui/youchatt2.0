INSERT INTO requests(id, from_user_id, to_user_id)
VALUE($1, $2, $3)
RETURNING *
