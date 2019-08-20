INSERT INTO moments(id, user_id, created_at)
VALUE($1, $2, $3)
RETURNING *
