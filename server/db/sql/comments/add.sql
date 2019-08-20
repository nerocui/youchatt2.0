INSERT INTO comments(id, moment_id, commenter_id, content, created_at)
VALUE($1, $2, $3, $4, $5)
RETURNING *
