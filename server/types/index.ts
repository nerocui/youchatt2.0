export type UserModel = {
	id: string,
	email: string,
	username: string,
	first_name: string,
	last_name: string,
	initials: string,
	profile_pic: string,
	message_token: string,
};

export type RequestModel = {
	id: string,
	to_user_id: string,
};

export type RelationshipModel = {
	user_id: string,
	friend_id: string,
};
