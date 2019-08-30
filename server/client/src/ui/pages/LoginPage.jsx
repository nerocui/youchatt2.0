import React from 'react';
import { Page, LoginScreenTitle, Button, Link } from 'framework7-react';
import Iframe from 'react-iframe';

const LoginPage = () => {
	return (
		<Page noToolbar noNavbar noSwipeback loginScreen>
			{/* <Iframe url='localhost:3000/auth/google'/> */}
			<Button raised large fill onClick={() => {window.location = '/auth/google';}}>Login With Google</Button>
		</Page>
	);
}

export default LoginPage;
