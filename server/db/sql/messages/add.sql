INSERT INTO messages(id, content, sender_id, receiver_id, seen)
VALUE($1, $2, $3, $4, $5)
RETURNING *
