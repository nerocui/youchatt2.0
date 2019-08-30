import React from 'react';
import { Card, CardContent, CardHeader, CardFooter, Button } from 'framework7-react';

const FriendRequest = ({id, from_user_id, from_user_name, from_user_pic, to_user_id, read}) => {
	return (
		<Card>
			<CardContent>
				<img src={from_user_pic} className="profile_pic"/>
				<h4>{from_user_name}</h4>
			</CardContent>
			<CardFooter>
				<Button>
					Decline
				</Button>
				<Button>
					Accept
				</Button>
			</CardFooter>
		</Card>
	);
};

export default FriendRequest;
