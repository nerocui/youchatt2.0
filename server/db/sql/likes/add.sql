INSERT INTO likes(id, moment_id, liker_id, created_at)
VALUE($1, $2, $3, $4)
RETURNING *
