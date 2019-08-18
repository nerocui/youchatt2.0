/*
    Inserts a new User record.
*/
INSERT INTO users(id, email, username, first_name, last_name, initials, profile_pic)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING *
