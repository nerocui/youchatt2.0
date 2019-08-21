INSERT INTO requests(id, to_user_id)
VALUES($1, $2)
RETURNING *
