INSERT INTO images(id, pic_url, moment_id)
VALUE($1, $2, $3)
RETURNING *
