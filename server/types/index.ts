export type UserModel = {
	id: string,
	email: string,
	username: string,
	first_name: string,
	last_name: string,
	initials: string,
	profile_pic: string,
};

export type RequestModel = {
	id: string,
	from_user_id: string,
	to_user_id: string,
};
