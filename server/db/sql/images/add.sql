INSERT INTO images(id, pic_url, moment_id, order)
VALUE($1, $2, $3, $4)
RETURNING *
