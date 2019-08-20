CREATE TABLE IF NOT EXISTS images
(
	id text PRIMARY KEY,
	pic_url text NOT NULL,
	moment_id text REFERENCES moments (id) ON DELETE CASCADE,
	order integer NOT NULL
)
