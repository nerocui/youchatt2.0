INSERT INTO moments(id, user_id)
VALUE($1, $2)
RETURNING *
