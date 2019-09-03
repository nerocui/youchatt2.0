import React from 'react';
import { Card, CardContent, CardHeader, CardFooter, Button } from 'framework7-react';

const SearchResult = ({email, id, first_name, username, last_name, profile_pic, sendRequest}) => {
	
	return (
		<Card>
			<CardContent>
				<img src={profile_pic} className="profile_pic"/>
				<h4>{username}</h4>
			</CardContent>
			<CardFooter>
				<Button onClick={() => sendRequest(id)}>
					Send Request
				</Button>
			</CardFooter>
		</Card>
	);
}

export default SearchResult;
