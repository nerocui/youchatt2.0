INSERT INTO requests(id, from_user_id, to_user_id)
VALUES($1, $2, $3)
RETURNING *
