import Request from '../../model/Request';
import TYPE from './type';

export default function notificationHandler(res) {
	console.log('Notification: ', res);
	const { data, notification } = res;
	switch (data["type"]) {
		case TYPE.FRIEND_REQUEST:
			handleFriendRequest(data);
			break;
		default:
			break;
	}
}

export function handleFriendRequest(data) {
	const {
		request_id,
		from_user_id,
		from_user_name,
		from_user_pic,
		to_user_id,
		read,
	} = data;
	const request = new Request(
		request_id,
		from_user_id,
		from_user_name,
		from_user_pic,
		to_user_id,
		read === "true");
	//validate
	Request.saveRequest(request);
}
