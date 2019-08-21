import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
	return (
		<div>
			Main Page
			<Link to='/search'>Search</Link>
		</div>
	);
}

export default MainPage;
